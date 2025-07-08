<script lang="ts">
	interface Props {
		/** Is the checkbox checked? */
		checked?: boolean;
		/** Is the checkbox disabled? */
		disabled?: boolean;
		/** Label to display next to the checkbox */
		label?: string;
		/** Callback function when the checkbox is toggled */
		onToggle?: (checked: boolean) => void;
	}

	const { checked = false, disabled = false, label = 'Select All', ...props }: Props = $props();

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (props.onToggle) {
			props.onToggle(target.checked);
		}
	}
</script>

<div class="select-all-checkbox">
	<label class:disabled>
		<input type="checkbox" {checked} {disabled} on:change={handleChange} {...props} />
		<span>{label}</span>
	</label>
</div>

<style>
	.select-all-checkbox {
		display: flex;
		align-items: center;
		font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		margin-bottom: 8px;
	}

	label {
		display: flex;
		align-items: center;
		cursor: pointer;
		user-select: none;
	}

	.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	input {
		margin-right: 8px;
		cursor: pointer;
	}

	.disabled input {
		cursor: not-allowed;
	}

	span {
		font-size: 14px;
		color: #333;
	}
</style>
