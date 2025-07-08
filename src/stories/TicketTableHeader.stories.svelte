<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TicketTableHeader from '$lib/components/TicketTableHeader.svelte';
	import { fn } from 'storybook/test';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/TicketTableHeader',
		component: TicketTableHeader,
		tags: ['autodocs'],
		argTypes: {
			openedTotal: { control: 'number' },
			closedTotal: { control: 'number' },
			showOpened: { control: 'boolean' }
		},
		args: {
			onFilterUpdated: fn()
		}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ openedTotal: 5, closedTotal: 3, showOpened: true }} />

<Story name="Show Opened" args={{ openedTotal: 10, closedTotal: 5, showOpened: true }} />

<Story name="Show Closed" args={{ openedTotal: 10, closedTotal: 5, showOpened: false }} />

<Story name="Many Opened Tickets" args={{ openedTotal: 100, closedTotal: 5, showOpened: true }} />

<Story name="Many Closed Tickets" args={{ openedTotal: 5, closedTotal: 100, showOpened: false }} />

<Story name="No Tickets" args={{ openedTotal: 0, closedTotal: 0, showOpened: true }} />

<Story name="Only Opened Tickets" args={{ openedTotal: 10, closedTotal: 0, showOpened: true }} />

<Story name="Only Closed Tickets" args={{ openedTotal: 0, closedTotal: 10, showOpened: false }} />
