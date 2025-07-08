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

<h1>Agent Dashboard</h1>

<TicketTable
	openedTotal={data.openedTotal}
	closedTotal={data.closedTotal}
	showOpened={open}
	tickets={data.tickets}
	onFilterUpdated={filterUpdated}
/>
