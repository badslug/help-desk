<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Paginator from '$lib/components/Paginator.svelte';
	import { fn } from 'storybook/test';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/Paginator',
		component: Paginator,
		tags: ['autodocs'],
		argTypes: {
			offset: { control: 'number' },
			limit: { control: 'number' },
			total: { control: 'number' },
			selectedColor: { control: 'color' }
		},
		args: {
			onPageChange: fn()
		}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story
	name="Default"
	args={{
		offset: 0,
		limit: 10,
		total: 100
	}}
/>

<Story
	name="Middle Page Selected"
	args={{
		offset: 70,
		limit: 10,
		total: 250
	}}
/>

<Story
	name="First Page (Previous Disabled)"
	args={{
		offset: 0,
		limit: 10,
		total: 100
	}}
/>

<Story
	name="Last Page (Next Disabled)"
	args={{
		offset: 90,
		limit: 10,
		total: 100
	}}
/>

<Story
	name="Few Pages"
	args={{
		offset: 10,
		limit: 10,
		total: 35
	}}
/>

<Story
	name="Many Pages"
	args={{
		offset: 50,
		limit: 10,
		total: 500
	}}
/>

<Story
	name="Custom Selected Color"
	args={{
		offset: 30,
		limit: 10,
		total: 100,
		selectedColor: '#ffcccb'
	}}
/>

<Story
	name="Different Items Per Page"
	args={{
		offset: 60,
		limit: 20,
		total: 200
	}}
/>
