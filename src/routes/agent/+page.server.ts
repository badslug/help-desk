import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { tickets } from '$lib/server/db/schema';
import { eq, count } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url }) => {
	const status = url.searchParams.get('status') || 'opened';
	const open = status === 'opened';

	// Query tickets based on the open status
	const filteredTickets = await db.select().from(tickets).where(eq(tickets.open, open));

	// Count total opened and closed tickets
	const openedTicketsCount = await db
		.select({ value: count() })
		.from(tickets)
		.where(eq(tickets.open, true));
	const closedTicketsCount = await db
		.select({ value: count() })
		.from(tickets)
		.where(eq(tickets.open, false));

	return {
		tickets: filteredTickets,
		openedTotal: openedTicketsCount[0].value,
		closedTotal: closedTicketsCount[0].value
	};
};
