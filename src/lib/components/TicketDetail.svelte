<script lang="ts">
	import Markdown from 'svelte-exmarkdown';
	import { Category, Ticket } from '$lib/models';
	import TicketStatus from '$lib/components/TicketStatus.svelte';
	import CategoryTag from '$lib/components/CategoryTag.svelte';

	interface Props {
		/** The ticket to display and edit */
		ticket: Ticket;
		/** The category the ticket belongs to. */
		category: Category;
	}

	const { ticket, category, ...props }: Props = $props();
</script>

<div class="ticket-container" {...props}>
	<h1><TicketStatus status={ticket.open ? 'open' : 'closed'} /> {ticket.name}</h1>
	<p class="tid">#{ticket.id} <CategoryTag {category} /></p>

	<Markdown md={ticket.description} />
</div>

<style>
	.ticket-container {
		min-width: 20px;
	}
</style>
