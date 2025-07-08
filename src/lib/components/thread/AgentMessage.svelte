<script lang="ts">
	import Markdown from 'svelte-exmarkdown';
	import { Message, ProposedTicket } from '$lib/models';
	import Button from '$lib/components/Button.svelte';

	interface Props {
		/** The message to display */
		message: Message;
		/** Callback when a ticket is ready to be created. */
		onTicket: (ticket: ProposedTicket) => void;
	}

	const { message, onTicket }: Props = $props();

	const isClarifying = message.text.startsWith('clarify:');
	let msg = $state(
		(isClarifying
			? message.text.slice('clarify:'.length)
			: message.text.slice('ticket:'.length)
		).trim()
	);
	let ticket = { name: '', email: '', category: '', category_id: 0, title: '', description: '' };

	// Sometimes clarifying responses contain a ticket inside the message itself. Detect the ticket and reformat it.
	const parseMessage = () => {
		if (isClarifying && msg.indexOf('ticket: {') > 0) {
			msg = msg.substring(0, msg.indexOf('ticket: {'));
			const ticketBody = message.text.substring(message.text.indexOf('ticket: {') + 8);
			ticket = JSON.parse(ticketBody);
			msg += '# Ticket\n';
			msg += '- **Title**: ' + ticket.title + '\n';
			msg += '- **Name**: ' + ticket.name + '\n';
			msg += '- **Email**: ' + ticket.email + '\n';
			msg += '- **Category**: ' + ticket.category + '\n\n';
			msg += '## Description\n';
			msg += ticket.description + '\n\n';
		} else if (!isClarifying) {
			// This is a pure ticket
			ticket = JSON.parse(msg);
			msg = '# Customer Information\n';
			msg += '- **Title**: ' + ticket.title + '\n';
			msg += '- **Name**: ' + ticket.name + '\n';
			msg += '- **Email**: ' + ticket.email + '\n';
			msg += '- **Category**: ' + ticket.category + '\n\n';
			msg += '## Description\n';
			msg += ticket.description + '\n\n';
		}
	};
	parseMessage();

	// Format the timestamp for display
	let formattedTime = $derived(() => {
		const date = new Date(message.created);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	});
</script>

<div class="agent-message" id="message-{message.id}">
	{#if message.text.startsWith('ticket:')}
		<h3>Support Ticket</h3>
		<div class="bubble">
			<Markdown md={msg} />
		</div>
		<p>
			Is this support ticket acceptable? Click/tap the "create ticket" button if you want to proceed
			creating the support ticket. Otherwise, tell me more information to add to the support ticket.
		</p>
		<Button
			primary={true}
			label="Create Ticket"
			kind="button"
			onclick={() => {
				if (onTicket) {
					onTicket(ticket);
				}
			}}
		/>
	{:else}
		<div class="bubble">
			<Markdown md={msg} />
		</div>
		<div class="timestamp">{formattedTime()}</div>
	{/if}
</div>

<style>
	.agent-message {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 8px;
		max-width: 80%;
	}

	.bubble {
		background-color: #e5e5ea;
		border-radius: 18px;
		padding: 10px 14px;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
		margin: 0;
		word-wrap: break-word;
		color: #000;
		font-size: 16px;
		line-height: 1.4;
	}

	.timestamp {
		font-size: 12px;
		color: #8e8e93;
		margin-top: 2px;
		margin-left: 4px;
	}
</style>
