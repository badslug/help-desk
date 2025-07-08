<script lang="ts">
	// The header of a table displaying tickets.
	import { Ticket } from '$lib/models';
	import TicketTableHeader from '$lib/components/TicketTableHeader.svelte';
	import TicketTableRow from '$lib/components/TicketTableRow.svelte';

	interface Props {
		/** The total number of open tickets */
		openedTotal: number;
		/** The total number of closed tickets */
		closedTotal: number;
		/** True if the table shows opened tickets. This will be expanded to be a more general filter and sort configuration. */
		showOpened: boolean;
		/** The list of tickets to display in the table. */
		tickets: Ticket[];
		/** Path to the tickets details page */
		path: string;
		/** Callback when the filter mode changes. */
		onFilterUpdated: (showOpened: boolean) => void;
	}

	const {
		openedTotal = 0,
		closedTotal = 0,
		showOpened = true,
		tickets = [],
		path = '/tickets',
		...props
	}: Props = $props();
</script>

<table>
	<TicketTableHeader
		{openedTotal}
		{closedTotal}
		{showOpened}
		onFilterUpdated={props.onFilterUpdated}
	/>
	<tbody>
		{#each tickets as ticket (ticket.id)}
			<TicketTableRow {ticket} {path} />
		{:else}
			<tr>
				<td colspan="3" class="empty">No Results</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
		width: 100%;
		border: 1px solid #aaa;
		border-radius: 5px;
	}
	.empty {
		width: 100%;
		height: 7em;
		text-align: center;
	}
</style>
