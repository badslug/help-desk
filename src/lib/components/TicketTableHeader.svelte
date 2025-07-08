<script lang="ts">
	// The header of a table displaying tickets.
	import Pill from '$lib/components/Pill.svelte';

	interface Props {
		/** The total number of open tickets */
		openedTotal: number;
		/** The total number of closed tickets */
		closedTotal: number;
		/** True if the table shows opened tickets. This will be expanded to be a more general filter and sort configuration. */
		showOpened: boolean;
		/** Callback when the filter mode changes. */
		onFilterUpdated: (showOpened: boolean) => void;
	}

	const { openedTotal = 0, closedTotal = 0, showOpened = true, ...props }: Props = $props();

	function closed() {
		if (props.onFilterUpdated) {
			props.onFilterUpdated(false);
		}
	}

	function opened() {
		if (props.onFilterUpdated) {
			props.onFilterUpdated(true);
		}
	}
</script>

<thead>
	<tr>
		<th><!-- We will be putting a SelectAllCheckbox here once we have bulk actions. --></th>
		<th colspan="2">
			<Pill
				label="Opened"
				count={openedTotal}
				selected={showOpened}
				onClick={opened}
				pillColor="#67ad5b"
			/>
			-
			<Pill
				label="Closed"
				count={closedTotal}
				selected={!showOpened}
				onClick={closed}
				pillColor="#5298f3"
			/>
		</th>
		<!-- We will be adding sortable columns for fields like author, categories, dates, etc -->
	</tr>
</thead>

<style>
	tr {
		background-color: #ededed;
		border-bottom: 1px solid #aaa;
		margin-bottom: 0.5em;
	}
	th {
		text-align: left;
		font-weight: inherit;
	}
</style>
