<script lang="ts">
	interface Props {
		/** The text label to display */
		label: string;
		/** The current sorting mode (ascending or descending) */
		sortMode?: 'asc' | 'desc';
		/** Whether the column is currently selected for sorting */
		selected?: boolean;
		/** Callback function when the sorting mode is changed */
		onSortChange?: (sortMode: 'asc' | 'desc') => void;
	}

	const { label, sortMode = 'desc', selected = false, ...props }: Props = $props();

	function toggleSortMode() {
		if (props.onSortChange) {
			const newSortMode = sortMode === 'asc' ? 'desc' : 'asc';
			props.onSortChange(newSortMode);
		}
	}
</script>

<div class="sorted-column" class:selected on:click={toggleSortMode} {...props}>
	<span class="label">{label}</span>
	<span class="arrow" class:asc={sortMode === 'asc'} class:desc={sortMode === 'desc'}>
		{#if sortMode === 'asc'}
			▲
		{:else}
			▼
		{/if}
	</span>
</div>

<style>
	.sorted-column {
		display: inline-flex;
		align-items: center;
		font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size: 14px;
		color: #333;
		padding: 8px 12px;
		cursor: pointer;
		user-select: none;
		transition: all 0.2s ease;
		border-bottom: 2px solid transparent;
	}

	.sorted-column:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.selected {
		font-weight: 700;
		color: #1a1a1a;
		border-bottom: 2px solid #555ab9;
	}

	.label {
		margin-right: 8px;
	}

	.arrow {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		transition: transform 0.2s ease;
	}

	.asc {
		color: #555ab9;
	}

	.desc {
		color: #555ab9;
	}
</style>
