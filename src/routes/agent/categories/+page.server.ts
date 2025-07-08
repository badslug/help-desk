import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';

export const load: PageServerLoad = async () => {
	// Query all categories
	const allCategories = await db.select().from(categories);

	return {
		categories: allCategories
	};
};

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString() || '';
		const description = formData.get('description')?.toString() || '';
		const color = formData.get('color')?.toString() || '#000000';

		if (!name) {
			return { success: false, error: 'Name is required' };
		}

		const now = new Date().toISOString();

		try {
			await db.insert(categories).values({
				name,
				description,
				color,
				created: now,
				modified: now
			});
			return { success: true };
		} catch (error) {
			console.error('Error creating category:', error);
			return { success: false, error: 'Failed to create category' };
		}
	},

	update: async ({ request }) => {
		const formData = await request.formData();
		const id = parseInt(formData.get('id')?.toString() || '0');
		const name = formData.get('name')?.toString() || '';
		const description = formData.get('description')?.toString() || '';
		const color = formData.get('color')?.toString() || '#000000';

		if (!id || !name) {
			return { success: false, error: 'ID and name are required' };
		}

		const now = new Date().toISOString();

		try {
			await db
				.update(categories)
				.set({
					name,
					description,
					color,
					modified: now
				})
				.where(eq(categories.id, id));
			return { success: true };
		} catch (error) {
			console.error('Error updating category:', error);
			return { success: false, error: 'Failed to update category' };
		}
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = parseInt(formData.get('id')?.toString() || '0');

		if (!id) {
			return { success: false, error: 'ID is required' };
		}

		try {
			await db.delete(categories).where(eq(categories.id, id));
			return { success: true };
		} catch (error) {
			console.error('Error deleting category:', error);
			return { success: false, error: 'Failed to delete category' };
		}
	}
} satisfies Actions;
