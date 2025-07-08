/**
 * Category model class that matches the categories table schema
 */
export class Category {
	/**
	 * Unique identifier for the category
	 */
	id: number;

	/**
	 * Display name of the category
	 */
	name: string;

	/**
	 * Detailed description of the category
	 */
	description: string;

	/**
	 * Color of the category.
	 */
	color: string;

	constructor(id: number, color: string, name: string, description: string) {
		this.id = id;
		this.color = color;
		this.name = name;
		this.description = description;
	}
}
