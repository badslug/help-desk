<script lang="ts">
	import TicketTable from '$lib/components/TicketTable.svelte';
	import type { PageProps } from './$types';
	import { ensureUrlParam } from '$lib/utils';
	import { page } from '$app/state';

	let { data }: PageProps = $props();

	const open = page.url.searchParams.get('status') !== 'closed';

	function filterUpdated(showOpen: boolean) {
		ensureUrlParam('status', showOpen ? 'opened' : 'closed');
	}
</script>

<svelte:head>
	<title>Agent Dashboard</title>
</svelte:head>

<h1>Agent Dashboard</h1>

<div class="nav-links">
	<a href="/agent/categories">Manage Categories</a>
</div>

<TicketTable
	openedTotal={data.openedTotal}
	closedTotal={data.closedTotal}
	showOpened={open}
	path="/agent/tickets"
	tickets={data.tickets}
	onFilterUpdated={filterUpdated}
/>

<style>
	.nav-links {
		margin-bottom: 1rem;
	}

	.nav-links a {
		display: inline-block;
		padding: 0.5rem 1rem;
		background-color: #4caf50;
		color: white;
		text-decoration: none;
		border-radius: 4px;
		margin-right: 0.5rem;
	}

	.nav-links a:hover {
		background-color: #45a049;
	}
</style>
