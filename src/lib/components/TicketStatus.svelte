<script lang="ts">
	interface Props {
		/** The current status of the ticket */
		status: 'open' | 'closed' | string;
	}

	const { status = 'open', ...props }: Props = $props();

	// Status configuration - can be extended with additional statuses in the future
	const statusConfig = {
		open: {
			color: '#4caf50', // Green
			icon: null
		},
		closed: {
			color: '#2196f3', // Blue
			icon: '✓' // Checkmark
		}
		// Additional statuses can be added here in the future
	};

	// Get the configuration for the current status, or use a default if not found
	const currentConfig = statusConfig[status] || {
		color: '#9e9e9e', // Gray default for unknown statuses
		icon: null
	};
</script>

<div class="ticket-status" {...props} title={status}>
	<div class="status-indicator" style={`background-color: ${currentConfig.color}`}>
		{#if currentConfig.icon}
			<span class="status-icon">{currentConfig.icon}</span>
		{/if}
	</div>
</div>

<style>
	.ticket-status {
		display: inline-flex;
		align-items: center;
		font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size: 14px;
		color: #333;
	}

	.status-indicator {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border-radius: 50%;
	}

	.status-icon {
		color: white;
		font-size: 10px;
		font-weight: bold;
	}
</style>
