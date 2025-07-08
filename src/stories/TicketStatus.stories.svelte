<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TicketStatus from '$lib/components/TicketStatus.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/TicketStatus',
		component: TicketStatus,
		tags: ['autodocs'],
		argTypes: {
			status: {
				control: { type: 'select' },
				options: ['open', 'closed', 'pending', 'in-progress']
			}
		}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Open Status" args={{ status: 'open' }} />

<Story name="Closed Status" args={{ status: 'closed' }} />

<!-- Demonstrating extensibility with potential future statuses -->
<Story name="Future Status (Pending)" args={{ status: 'pending' }} />

<Story name="Future Status (In Progress)" args={{ status: 'in-progress' }} />
