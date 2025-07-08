<script lang="ts">
	import { Message } from '$lib/models';

	interface Props {
		/** The message to display */
		message: Message;
	}

	const { message }: Props = $props();

	// Format the timestamp for display
	let formattedTime = $derived(() => {
		const date = new Date(message.created);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	});
</script>

<div class="user-message" id="message-{message.id}">
	<div class="bubble">
		<p>{message.text}</p>
	</div>
	<div class="timestamp">{formattedTime()}</div>
</div>

<style>
	.user-message {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin-bottom: 8px;
		max-width: 80%;
		align-self: flex-end;
	}

	.bubble {
		background-color: #0b93f6;
		border-radius: 18px;
		padding: 10px 14px;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
	}

	.bubble p {
		margin: 0;
		word-wrap: break-word;
		color: #fff;
		font-size: 16px;
		line-height: 1.4;
	}

	.timestamp {
		font-size: 12px;
		color: #8e8e93;
		margin-top: 2px;
		margin-right: 4px;
	}
</style>
