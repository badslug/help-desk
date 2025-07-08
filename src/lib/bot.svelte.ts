import { Message } from '$lib/models';

export class Bot {
	/**
	 * The ID of bot that is responding to the user.
	 */
	id: number;
	/**
	 * The ID of the user that is sending messages to the bot.
	 */
	user: number;
	/**
	 * The conversation that the bot is having with the user.
	 */
	conversation: Message[];
	/**
	 * The number of LLM tasks currently running. Any positive number indicates the agent is busy.
	 */
	thinking: number;
	/**
	 * An optional handler that the bot will call whenever it adds a message to the conversation.
	 * This includes both bot and user messages.
	 */
	messageHandler?: (message: Message) => void;

	/**
	 * Session used to track the chat conversation to the bot. If there are logins we might consider resuming chats across logins.
	 */
	session: string;

	/**
	 * Send a message to the bot for processing.
	 * The bot will call an LLM to evaluate the message and will eventually add zero or more responses that it generates.
	 *
	 * @param message {string} the message to send to the bot.
	 */
	async send(message: string) {
		const msg = new Message(
			this.conversation.length + 1,
			this.user,
			message,
			new Date().toISOString()
		);
		this.conversation.push(msg);
		if (this.messageHandler) {
			this.messageHandler(msg);
		}

		this.thinking++;

		// Send to server to relay to chatbot
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ message, session: this.session })
		};

		// Note this is directly to the LangFlow server (running locally during development). If deployed to production
		// the bot will need to proxy calls through the server backend.
		fetch('/api/ai', options)
			.then((response) => response.json())
			.then((response) => {
				const answer = response.answer;
				const msg = new Message(
					this.conversation.length + 1,
					this.id,
					answer,
					new Date().toISOString()
				);
				this.thinking--;
				this.conversation.push(msg);
				if (this.messageHandler) {
					this.messageHandler(msg);
				}
			})
			.catch((err) => console.error(err));
	}

	constructor(id: number, user: number, messageHandler: (message: Message) => void) {
		this.id = id;
		this.user = user;
		this.conversation = $state([]);
		this.thinking = $state(0);
		this.messageHandler = messageHandler;
		this.session = crypto.randomUUID(); // For now, we randomly generate a session idea and store it in memory
	}
}
