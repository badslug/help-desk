<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MessageThread from '$lib/components/thread/MessageThread.svelte';
	import { Message } from '$lib/models';

	// Create a conversation with multiple messages
	const baseTime = new Date('2023-06-15T14:00:00Z').getTime();
	const conversation = [
		new Message(1, 1, 'Hello! How can I help you today?', new Date(baseTime).toISOString()),
		new Message(
			2,
			2,
			'Hi there! I have a question about my account.',
			new Date(baseTime + 60000).toISOString()
		),
		new Message(
			3,
			1,
			'Of course! What would you like to know about your account?',
			new Date(baseTime + 120000).toISOString()
		),
		new Message(
			4,
			2,
			"I'm trying to update my payment information but I'm getting an error.",
			new Date(baseTime + 180000).toISOString()
		),
		new Message(
			5,
			1,
			"I'm sorry to hear that. Can you tell me what error message you're seeing?",
			new Date(baseTime + 240000).toISOString()
		),
		new Message(
			6,
			2,
			'It says "Invalid card number" but I\'ve double-checked and the number is correct.',
			new Date(baseTime + 300000).toISOString()
		),
		new Message(
			7,
			1,
			"Let me look into that for you. Can you confirm the last 4 digits of the card you're trying to use?",
			new Date(baseTime + 360000).toISOString()
		)
	];

	// Create a short conversation
	const shortConversation = conversation.slice(0, 3);

	// Create an empty conversation
	const emptyConversation = [];

	// Define the meta for the stories
	const { Story } = defineMeta({
		title: 'Thread/MessageThread',
		component: MessageThread,
		tags: ['autodocs'],
		argTypes: {
			messages: { control: 'object' },
			currentUserId: { control: 'number' }
		}
	});
</script>

<Story name="Full Conversation" args={{ messages: conversation, currentUserId: 2 }} />

<Story name="Short Conversation" args={{ messages: shortConversation, currentUserId: 2 }} />

<Story name="Empty Conversation" args={{ messages: emptyConversation, currentUserId: 2 }} />
