import type { RequestHandler } from './$types';
import { categories, tickets } from '$lib/server/db/schema';
import { db } from '$lib/server/db';

// Get retrieves the data that AI bots need to create context.
// Normally we would configure the bot to directly access the database for context but with an embedded sqlite database
// this seems like the safest method for providing the LLM with context.
export const GET: RequestHandler = async () => {
	// Query all categories
	const allCategories = await db.select().from(categories);

	return new Response(JSON.stringify({ categories: allCategories }));
};

// Create a ticket using the API. Normally this is protected with auth or API keys.
// For simplicity, this demo just accepts any tickets submitted via the API.
export const POST: RequestHandler = async ({ request }) => {
	const ticket = await request.json();
	if (ticket.category_id) {
		ticket.category = ticket.category_id;
		delete ticket.category_id;
	}
	// TODO we don't have logins and users yet so we just add it to the ticket description
	let meta = '';
	if (ticket.name) {
		meta += '- **Customer Name**: ' + ticket.name + '\n';
		delete ticket.name;
	}
	if (ticket.email) {
		meta += '- **Customer Email**: ' + ticket.email + '\n';
		delete ticket.email;
	}
	if (meta.length > 0) {
		ticket.description = meta + '\n' + ticket.description;
	}

	ticket.name = ticket.title;
	ticket.open = true;
	ticket.created = new Date().toISOString();
	const created = await db.insert(tickets).values(ticket).returning({ insertedId: tickets.id });
	return new Response(JSON.stringify(created));
};
