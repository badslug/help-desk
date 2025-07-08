<script lang="ts">
	import type { PageProps } from './$types';
	import TicketDetail from '$lib/components/TicketDetail.svelte';

	let { data }: PageProps = $props();
</script>

<h1>Ticket</h1>

{#if data.ticket}
	<TicketDetail ticket={data.ticket} category={null}/>
{:else}
	<p>No matching ticket found for ticket ID</p>
{/if}
