<script lang="ts">
	interface Props {
		/** The text label to display */
		label: string;
		/** Background color of the pill */
		color?: string;
		/** Callback function when the tag is clicked */
		onClick?: () => void;
	}

	const { label, color = '#3fb9c9', ...props }: Props = $props();

	let tagStyle = $derived(color ? `background-color: ${color}` : '');

	function click() {
		if (props.onClick) {
			props.onClick();
		}
	}
</script>

<span class="tag-container" {...props} onclick={click}>
	<span class="label" style={tagStyle}>{label}</span>
</span>

<style>
	.tag-container {
		display: inline-flex;
		padding: 5px;
		align-items: center;
		justify-content: center;
		min-width: 20px;
		height: 20px;
		border-radius: 5px;
		font-weight: 700;
		color: #333;
	}

	.label {
		padding: 5px;
		border-radius: 5px;
	}
</style>
