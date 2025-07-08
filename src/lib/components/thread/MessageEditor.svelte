<script lang="ts">
	// The MessageEditor allows users to submit a message to the system.
	// This component resembles the Apple Messages input area.
	interface Props {
		/** The name for the input. This is expected to be the form name when it is posted to the server. */
		name?: string;
		/** Placeholder text for the input */
		placeholder?: string;
		/** Whether the input is disabled */
		disabled?: boolean;
		/** Callback for receiving new messages that are being sent */
		onSend?: (message: string) => void;
	}

	const {
		name = 'message',
		placeholder = 'Message',
		disabled = false,
		onSend,
		...props
	}: Props = $props();

	let messageText = $state('');

	// Handle sending a message
	function handleSend() {
		if (messageText.trim()) {
			if (onSend) {
				onSend(messageText.trim());
			}
			messageText = '';
		}
	}

	// Handle key press events (send on Enter, unless Shift is pressed)
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSend();
		}
	}
</script>

<div class="message-editor">
	<div class="input-container">
		<textarea
			{name}
			bind:value={messageText}
			{placeholder}
			{disabled}
			onkeydown={handleKeydown}
			rows="1"
			{...props}
		></textarea>
		<button
			class="send-button"
			onclick={handleSend}
			disabled={!messageText.trim() || disabled}
			aria-label="Send message"
		>
			<svg viewBox="0 0 24 24" width="24" height="24">
				<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
			</svg>
		</button>
	</div>
</div>

<style>
	.message-editor {
		padding: 10px;
		border-top: 1px solid #e5e5ea;
		background-color: #fff;
	}

	.input-container {
		display: flex;
		align-items: center;
		background-color: #f2f2f7;
		border-radius: 20px;
		padding: 8px 12px;
	}

	textarea {
		flex: 1;
		border: none;
		background: transparent;
		resize: none;
		font-size: 16px;
		line-height: 1.4;
		max-height: 100px;
		padding: 0;
		font-family: inherit;
	}

	textarea:focus {
		outline: none;
	}

	.send-button {
		background: none;
		border: none;
		color: #0b93f6;
		cursor: pointer;
		padding: 4px;
		margin-left: 8px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.send-button:disabled {
		color: #8e8e93;
		cursor: default;
	}

	.send-button:hover:not(:disabled) {
		background-color: rgba(11, 147, 246, 0.1);
	}
</style>
