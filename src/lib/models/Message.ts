/**
 * Message model class that matches the messages table schema
 */
export class Message {
	/**
	 * Unique identifier for the message
	 */
	id: number;

	/**
	 * The ID of the author of the message.
	 */
	author: number;

	/**
	 * The message text.
	 */
	text: string;

	/**
	 * The RFC-3339 timestamp when the message was created
	 */
	created: string;

	/**
	 * The RFC-3339 timestamp when the message was last modified
	 */
	modified: string | undefined;

	constructor(id: number, author: number, text: string, created: string, modified?: string) {
		this.id = id;
		this.author = author;
		this.text = text;
		this.created = created;
		this.modified = modified;
	}
}
