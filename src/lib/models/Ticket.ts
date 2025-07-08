/**
 * Ticket model class that matches the tickets table schema
 */
export class Ticket {
	/**
	 * Unique identifier for the ticket
	 */
	id: number;

	/**
	 * Short title/name of the ticket
	 */
	name: string;

	/**
	 * Detailed description of the issue reported in the ticket
	 */
	description: string;

	/**
	 * Boolean flag indicating if the ticket is open (true) or closed (false)
	 */
	open: boolean;

	/**
	 * Foreign key reference to the category this ticket belongs to
	 */
	category: number;

	constructor(id: number, name: string, description: string, open: boolean, category: number) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.open = open;
		this.category = category;
	}
}

export class ProposedTicket {
	name: string;
	email: string;
	category: string;
	category_id: number;
	title: string;
	description: string;

	constructor(
		name: string = '',
		email: string = '',
		category: string = '',
		category_id: number = 0,
		title: string = '',
		description: string = ''
	) {
		this.name = name;
		this.email = email;
		this.category = category;
		this.category_id = category_id;
		this.title = title;
		this.description = description;
	}
}
