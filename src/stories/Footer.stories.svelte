<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Footer from '$lib/components/Footer.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/Footer',
		component: Footer,
		// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
		tags: ['autodocs'],
		parameters: {
			// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<Story name="This Year" args={{ year: '2025' }} />

<Story name="Last Year" args={{ year: '2024' }} />
