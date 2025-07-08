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
	name: string | null;

	/**
	 * Detailed description of the category
	 */
	description: string | null;

	/**
	 * Color of the category.
	 */
	color: string;

	constructor(id: number, color: string | null, name: string | null, description: string | null) {
		this.id = id;
		this.color = color ? color : '#000';
		this.name = name;
		this.description = description;
	}
}
