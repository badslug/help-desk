/**
 * Agent model class that matches the agents table schema
 */
export class Agent {
	/**
	 * Unique identifier for the agent
	 */
	id: number;

	/**
	 * Display name of the agent
	 */
	name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}
