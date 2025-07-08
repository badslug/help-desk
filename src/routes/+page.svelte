<script lang="ts">
	import MessageThread from '$lib/components/thread/MessageThread.svelte';
	import MessageEditor from '$lib/components/thread/MessageEditor.svelte';
	import { Message, ProposedTicket } from '$lib/models';
	import { Bot } from '$lib/bot.svelte';
	import { goto } from '$app/navigation';

	const bot = $state(new Bot(1, 2, handleMessage));
	let errors = $state('');

	function handleMessage(msg: Message) {
		const div = document.getElementById('message-' + msg.id);
		if (div) {
			div.scrollIntoView({ behavior: 'smooth', block: 'end' });
		}
	}

	function handleSend(message: string) {
		// Generate new message
		bot.send(message);
	}

	async function onTicket(ticket: ProposedTicket) {
		const response = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify(ticket),
			headers: {
				'content-type': 'application/json'
			}
		});

		try {
			const created = await response.json();
			console.log(created);
			if (Array.isArray(created) && created.length > 0) {
				goto('/tickets/' + created[0].insertedId);
			}
		} catch (err) {
			errors = err + '';
		}
	}
</script>

<svelte:head>
	<title>Customer Support</title>
</svelte:head>

<h1>Customer Support</h1>
<!-- TODO add an avatar picture here -->
<p>Welcome to the customer support portal. I'm a virtual assistant. How can I help you today?</p>

<div>
	<MessageThread messages={bot.conversation} currentUserId={2} {onTicket} />
	{#if bot.thinking > 0}
		<p class="working">Agent is working...</p>
	{/if}
	<MessageEditor placeholder="Type a message..." onSend={handleSend} />
</div>
{#if errors.length > 0}
	<div class="error">
		{errors}
	</div>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
		border: 1px solid #e5e5ea;
		border-radius: 8px;
	}
	.working {
		padding: 0.5em;
	}
	.error {
		color: red;
	}
</style>
