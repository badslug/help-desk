<script lang="ts">
	import { Category } from '$lib/models';
	import Tag from '$lib/components/Tag.svelte';

	interface Props {
		/** The category the ticket belongs to. */
		category: Category;
	}

	const { category, ...props }: Props = $props();
</script>

{#if category}
	<span class="ticket-container" {...props}>
		<Tag label={category.name} color={category.color} />
	</span>
{/if}

<style>
	.ticket-container {
		display: inline-flex;
	}
</style>
