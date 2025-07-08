<script lang="ts">
	import type { PageProps } from './$types';
	import TicketDetail from '$lib/components/TicketDetail.svelte';
	import Button from '$lib/components/Button.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Ticket {data.ticket.id} | Agent Dashboard</title>
</svelte:head>

<a href="/agent">Home</a>
<h1>Agent Ticket Manager</h1>

{#if data.ticket}
	<TicketDetail ticket={data.ticket} category={data.category} />
	<hr />
	{#if data.ticket.open}
		<form action="?/close" method="POST">
			<Button label="Close Ticket" kind="submit"></Button>
		</form>
	{:else}
		<form action="?/reopen" method="POST">
			<Button label="Reopen Ticket" kind="submit"></Button>
		</form>
	{/if}
{:else}
	<p>No matching ticket found for ticket ID</p>
{/if}
