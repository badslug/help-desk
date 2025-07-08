<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Pill from '$lib/components/Pill.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/Pill',
		component: Pill,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			count: { control: 'number' },
			selected: { control: 'boolean' },
			tagColor: { control: 'color' }
		}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ label: 'Category' }} />

<Story name="With Count" args={{ label: 'Category', count: 5 }} />

<Story name="Selected" args={{ label: 'Category', selected: true }} />

<Story name="Selected With Count" args={{ label: 'Category', count: 5, selected: true }} />

<Story name="Custom Pill Color" args={{ label: 'Category', count: 5, tagColor: '#c8e6c9' }} />

<Story
	name="Selected With Custom Pill Color"
	args={{ label: 'Category', count: 5, selected: true, tagColor: '#c8e6c9' }}
/>

<Story
	name="Long Label"
	args={{ label: 'This is a very long category name that might wrap', count: 99 }}
/>
