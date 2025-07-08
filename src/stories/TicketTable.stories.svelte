<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TicketTable from '$lib/components/TicketTable.svelte';
	import { Ticket } from '$lib/models';
	import { fn } from 'storybook/test';

	// Sample tickets for stories
	const openTickets = [
		new Ticket(1, 'Open Ticket 1', 'This is an open ticket', true, 1),
		new Ticket(2, 'Open Ticket 2', 'This is another open ticket', true, 2),
		new Ticket(3, 'Open Ticket 3', 'This is yet another open ticket', true, 3)
	];

	const closedTickets = [
		new Ticket(4, 'Closed Ticket 1', 'This is a closed ticket', false, 1),
		new Ticket(5, 'Closed Ticket 2', 'This is another closed ticket', false, 2)
	];

	const mixedTickets = [...openTickets, ...closedTickets];

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/TicketTable',
		component: TicketTable,
		tags: ['autodocs'],
		argTypes: {
			openedTotal: { control: 'number' },
			closedTotal: { control: 'number' },
			showOpened: { control: 'boolean' },
			tickets: { control: 'object' }
		},
		args: {
			onFilterUpdated: fn()
		}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story
	name="Default"
	args={{
		openedTotal: 3,
		closedTotal: 2,
		showOpened: true,
		tickets: openTickets
	}}
/>

<Story
	name="Show Opened Tickets"
	args={{
		openedTotal: 3,
		closedTotal: 2,
		showOpened: true,
		tickets: openTickets
	}}
/>

<Story
	name="Show Closed Tickets"
	args={{
		openedTotal: 3,
		closedTotal: 2,
		showOpened: false,
		tickets: closedTickets
	}}
/>

<Story
	name="Mixed Tickets"
	args={{
		openedTotal: 3,
		closedTotal: 2,
		showOpened: true,
		tickets: mixedTickets
	}}
/>

<Story
	name="No Tickets"
	args={{
		openedTotal: 0,
		closedTotal: 0,
		showOpened: true,
		tickets: []
	}}
/>

<Story
	name="Many Tickets"
	args={{
		openedTotal: 10,
		closedTotal: 5,
		showOpened: true,
		tickets: Array(10)
			.fill(null)
			.map(
				(_, i) =>
					new Ticket(
						i + 1,
						`Open Ticket ${i + 1}`,
						`This is open ticket ${i + 1}`,
						true,
						(i % 3) + 1
					)
			)
	}}
/>
