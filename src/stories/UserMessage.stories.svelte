<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import UserMessage from '$lib/components/thread/UserMessage.svelte';
	import { Message } from '$lib/models';

	// Create sample messages for the stories
	const shortMessage = new Message(2, 1, 'Hi there! I need some help.', new Date().toISOString());
	const longMessage = new Message(
		4,
		1,
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
		new Date().toISOString()
	);
	const messageWithTimestamp = new Message(
		6,
		1,
		'This message has a specific timestamp.',
		'2023-06-15T14:35:00Z'
	);

	// Define the meta for the stories
	const { Story } = defineMeta({
		title: 'Thread/UserMessage',
		component: UserMessage,
		tags: ['autodocs'],
		argTypes: {
			message: { control: 'object' }
		}
	});
</script>

<Story name="Short Message" args={{ message: shortMessage }} />

<Story name="Long Message" args={{ message: longMessage }} />

<Story name="With Specific Timestamp" args={{ message: messageWithTimestamp }} />
