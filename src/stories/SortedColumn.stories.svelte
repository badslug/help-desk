<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SortedColumn from '$lib/components/SortedColumn.svelte';
	import { fn } from 'storybook/test';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/SortedColumn',
		component: SortedColumn,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			sortMode: {
				control: { type: 'select' },
				options: ['asc', 'desc']
			},
			selected: { control: 'boolean' }
		},
		args: {
			onSortChange: fn()
		}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ label: 'Column Name' }} />

<Story name="Selected Ascending" args={{ label: 'Column Name', selected: true, sortMode: 'asc' }} />

<Story
	name="Selected Descending"
	args={{ label: 'Column Name', selected: true, sortMode: 'desc' }}
/>

<Story
	name="Long Column Name"
	args={{
		label: 'This is a very long column name that might wrap',
		selected: true,
		sortMode: 'asc'
	}}
/>
