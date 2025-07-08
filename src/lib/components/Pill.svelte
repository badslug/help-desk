<script lang="ts">
	interface Props {
		/** The text label to display */
		label: string;
		/** Optional count to display in the pill */
		count?: number;
		/** Whether the pill is in selected state */
		selected?: boolean;
		/** Background color of the pill */
		pillColor?: string;
		/** Callback function when the pill is clicked */
		onClick?: () => void;
	}

	const { label, count, selected = false, pillColor = '#e7e7e7', ...props }: Props = $props();

	let pillStyle = $derived(pillColor ? `background-color: ${pillColor}` : '');

	function click() {
		if (props.onClick) {
			props.onClick();
		}
	}
</script>

<div class="pill-container" class:selected {...props} onclick={click}>
	<span class="label">{label}</span>
	{#if count !== undefined}
		<span class="pill" style={pillStyle}>
			{count}
		</span>
	{/if}
</div>

<style>
	.pill-container {
		display: inline-flex;
		align-items: center;
		font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size: 14px;
		color: #333;
		padding: 4px 8px;
		border-radius: 4px;
		cursor: pointer;
		user-select: none;
		transition: all 0.2s ease;
	}

	.pill-container:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.selected {
		font-weight: 700;
		color: #1a1a1a;
	}

	.label {
		margin-right: 4px;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 20px;
		height: 20px;
		border-radius: 10px;
		padding: 0 6px;
		font-size: 12px;
		font-weight: 700;
		color: #333;
	}

	.selected .pill {
		color: #1a1a1a;
	}
</style>
