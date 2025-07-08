<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tag from '$lib/components/Tag.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/Tag',
		component: Tag,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			color: { control: 'color' }
		}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ label: 'Category' }} />

<Story name="Custom Pill Color" args={{ label: 'Category', color: '#c8e6c9' }} />

<Story name="Long Label" args={{ label: 'This is a very long category name that might wrap' }} />
