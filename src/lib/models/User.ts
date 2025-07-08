/**
 * User model class that matches the users table schema
 */
export class User {
	/**
	 * Unique identifier for the user
	 */
	id: number;

	/**
	 * Display name of the user
	 */
	name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}
