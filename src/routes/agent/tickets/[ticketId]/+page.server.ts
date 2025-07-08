import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { categories, tickets } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const ticketId = parseInt(params.ticketId);

		// Query tickets based on the open status
		const ticket = await db.query.tickets.findFirst({ where: eq(tickets.id, ticketId) });

		if (ticket && ticket.category) {
			const category = await db.query.categories.findFirst({
				where: eq(categories.id, ticket.category)
			});
			if (category) {
				return { ticket, category };
			}
		}

		return { ticket };
	} catch {
		return { ticket: null };
	}
};

import type { Actions } from './$types';

export const actions = {
	close: async (event) => {
		try {
			const ticketId = parseInt(event.params.ticketId);
			return db.update(tickets).set({ open: false }).where(eq(tickets.id, ticketId));
		} catch {
			return;
		}
	},
	reopen: async (event) => {
		try {
			const ticketId = parseInt(event.params.ticketId);
			return db.update(tickets).set({ open: true }).where(eq(tickets.id, ticketId));
		} catch {
			return;
		}
	}
} satisfies Actions;
