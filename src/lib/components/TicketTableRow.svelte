<script lang="ts">
	import { Ticket } from '$lib/models';
	import TicketStatus from '$lib/components/TicketStatus.svelte';

	interface Props {
		/** The ticket to display */
		ticket: Ticket;
	}

	const { ticket }: Props = $props();
</script>

<tr>
	<td><!-- We will be putting a checkbox here once we have bulk actions. --></td>
	<td><TicketStatus status={ticket.open ? 'open' : 'closed'} /></td>
	<td class="name">{ticket.name}</td>
	<!-- We will be adding sortable columns for fields like author, categories, dates, etc -->
</tr>

<style>
	.name {
		width: 100%;
	}
	td {
		padding: 0.2em;
	}
</style>
