<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TicketTableRow from '$lib/components/TicketTableRow.svelte';
	import { Ticket } from '$lib/models';

	// Sample tickets for stories
	const openTicket = new Ticket(1, 'Open Ticket', 'This is an open ticket', true, 1);
	const closedTicket = new Ticket(2, 'Closed Ticket', 'This is a closed ticket', false, 2);
	const longNameTicket = new Ticket(
		3,
		'This is a very long ticket name that might wrap to multiple lines',
		'This is a ticket with a long name',
		true,
		3
	);

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/TicketTableRow',
		component: TicketTableRow,
		tags: ['autodocs'],
		argTypes: {
			ticket: { control: 'object' }
		}
	});
</script>

<!-- Table wrapper to provide proper context for the row -->
<table>
	<tbody>
		<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
		<Story name="Open Ticket" args={{ ticket: openTicket }} />
	</tbody>
</table>

<table>
	<tbody>
		<Story name="Closed Ticket" args={{ ticket: closedTicket }} />
	</tbody>
</table>

<table>
	<tbody>
		<Story name="Long Name Ticket" args={{ ticket: longNameTicket }} />
	</tbody>
</table>
