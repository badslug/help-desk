// noinspection JSUnusedGlobalSymbols

/**
 * Drizzle ORM schemas for SQL tables used by the help desk application
 *
 * This file defines the database schema for the help desk application,
 * including tables for users, agents, tickets, and categories, as well as
 * their relationships.
 */

import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

/**
 * Users table - stores information about users who can create tickets
 */
export const users = sqliteTable('users', {
	/**
	 * Unique identifier for the user
	 */
	id: integer('id').primaryKey(),

	/**
	 * When the record was created.
	 */
	created: text('created'),
	/**
	 * When the record was last modified.
	 */
	modified: text('modified'),

	/**
	 * Display name of the user
	 */
	name: text('name')
});

/**
 * Agents table - stores information about support agents who handle tickets
 */
export const agents = sqliteTable('agents', {
	/**
	 * Unique identifier for the agent
	 */
	id: integer('id').primaryKey(),

	/**
	 * When the record was created.
	 */
	created: text('created'),
	/**
	 * When the record was last modified.
	 */
	modified: text('modified'),

	/**
	 * Display name of the agent
	 */
	name: text('name')
});

/**
 * Tickets table - stores help desk tickets created by users
 */
export const tickets = sqliteTable('tickets', {
	/**
	 * Unique identifier for the ticket
	 */
	id: integer('id').primaryKey(),

	/**
	 * When the record was created.
	 */
	created: text('created'),
	/**
	 * When the record was last modified.
	 */
	modified: text('modified'),

	/**
	 * Short title/name of the ticket
	 */
	name: text('name'),

	/**
	 * Detailed description of the issue reported in the ticket
	 */
	description: text('description'),

	/**
	 * Boolean flag indicating if the ticket is open (true) or closed (false)
	 */
	open: integer('open', { mode: 'boolean' }),

	/**
	 * Foreign key reference to the category this ticket belongs to
	 */
	category: integer('category').references(() => categories.id)
});

/**
 * Categories table - stores ticket categories.
 */
export const categories = sqliteTable('categories', {
	/**
	 * Unique identifier for the category
	 */
	id: integer('id').primaryKey(),

	/**
	 * When the record was created.
	 */
	created: text('created'),
	/**
	 * When the record was last modified.
	 */
	modified: text('modified'),

	/**
	 * Display name of the category
	 */
	name: text('name'),

	/**
	 * Color of the category
	 */
	color: text('color'),

	/**
	 * Detailed description of the issue reported in the category
	 */
	description: text('description')
});

/**
 * Defines the relationship between tickets and categories
 *
 * This allows for easy querying of a ticket's category information
 * through Drizzle ORM's relation API.
 */
export const ticketsRelations = relations(tickets, ({ one }) => ({
	category: one(categories, {
		fields: [tickets.category],
		references: [categories.id]
	})
}));
