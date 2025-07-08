<script lang="ts">
	import { Message, ProposedTicket } from '$lib/models';
	import AgentMessage from './AgentMessage.svelte';
	import UserMessage from './UserMessage.svelte';

	interface Props {
		/** The list of messages to display */
		messages: Message[];
		/** The ID of the current user, used to determine which messages are from the user */
		currentUserId: number;
		/** Callback then a ticket is ready to be created. */
		onTicket: (ticket: ProposedTicket) => void;
	}

	const { messages = [], currentUserId, onTicket }: Props = $props();

	// Function to determine if a message is from the current user
	function isUserMessage(message: Message): boolean {
		return message.author === currentUserId;
	}
</script>

<div class="message-thread">
	{#each messages as message (message.id)}
		{#if isUserMessage(message)}
			<UserMessage {message} />
		{:else}
			<AgentMessage {message} {onTicket} />
		{/if}
	{:else}
		<div class="empty-state">No messages yet</div>
	{/each}
</div>

<style>
	.message-thread {
		display: flex;
		flex-direction: column;
		padding: 16px;
		overflow-y: auto;
		height: 500px;
		background-color: #fff;
	}

	.empty-state {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		color: #8e8e93;
		font-style: italic;
	}
</style>
