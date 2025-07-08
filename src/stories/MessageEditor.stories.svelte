<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MessageEditor from '$lib/components/thread/MessageEditor.svelte';
	import { fn } from 'storybook/test';

	// Define the meta for the stories
	const { Story } = defineMeta({
		title: 'Thread/MessageEditor',
		component: MessageEditor,
		tags: ['autodocs'],
		argTypes: {
			name: { control: 'text' },
			placeholder: { control: 'text' },
			disabled: { control: 'boolean' }
		},
		args: {
			send: fn()
		}
	});
</script>

<Story name="Default" args={{ name: 'message', placeholder: 'Message' }} />

<Story
	name="Custom Placeholder"
	args={{ name: 'message', placeholder: 'Type your message here...' }}
/>

<Story name="Disabled" args={{ name: 'message', placeholder: 'Message', disabled: true }} />
