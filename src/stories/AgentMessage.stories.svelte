<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AgentMessage from '$lib/components/thread/AgentMessage.svelte';
	import { Message } from '$lib/models';

	// Create sample messages for the stories
	const shortMessage = new Message(
		1,
		1,
		'Hello, how can I help you today?',
		new Date().toISOString()
	);
	const longMessage = new Message(
		2,
		1,
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
		new Date().toISOString()
	);
	const messageWithTimestamp = new Message(
		3,
		1,
		'This message has a specific timestamp.',
		'2023-06-15T14:30:00Z'
	);

	// Define the meta for the stories
	const { Story } = defineMeta({
		title: 'Thread/AgentMessage',
		component: AgentMessage,
		tags: ['autodocs'],
		argTypes: {
			message: { control: 'object' }
		}
	});
</script>

<Story name="Short Message" args={{ message: shortMessage }} />

<Story name="Long Message" args={{ message: longMessage }} />

<Story name="With Specific Timestamp" args={{ message: messageWithTimestamp }} />
