<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Message } from '$lib/models';
	import MessageThread from '$lib/components/thread/MessageThread.svelte';
	import MessageEditor from '$lib/components/thread/MessageEditor.svelte';
	import { fn } from 'storybook/test';

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
		)
	];

	// Define the meta for the stories
	const { Story } = defineMeta({
		title: 'Thread/MessageThreadWithEditor',
		tags: ['autodocs'],
		args: {
			send: fn()
		}
	});
</script>

<!-- Create a complete message thread with a message editor -->
<Story name="Complete Thread">
	<div
		style="height: 500px; display: flex; flex-direction: column; border: 1px solid #e5e5ea; border-radius: 8px; overflow: hidden;"
	>
		<div style="flex: 1; overflow-y: auto;">
			<MessageThread messages={conversation} currentUserId={2} />
		</div>
		<MessageEditor placeholder="Type a message..." on:send={fn()} />
	</div>
</Story>
