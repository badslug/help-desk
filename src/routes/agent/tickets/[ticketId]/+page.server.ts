import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { tickets } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const ticketId = parseInt(params.ticketId);

		// Query tickets based on the open status
		const ticket = await db.query.tickets.findFirst({where: eq(tickets.id, ticketId)})

		return { ticket };
	} catch {
		return { ticket: null };
	}
};
