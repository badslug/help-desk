<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SelectAllCheckbox from '$lib/components/SelectAllCheckbox.svelte';
	import { fn } from 'storybook/test';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/SelectAllCheckbox',
		component: SelectAllCheckbox,
		tags: ['autodocs'],
		argTypes: {
			checked: { control: 'boolean' },
			disabled: { control: 'boolean' },
			label: { control: 'text' }
		},
		args: {
			onToggle: fn()
		}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ label: 'Select All' }} />

<Story name="Checked" args={{ checked: true, label: 'Select All' }} />

<Story name="Disabled" args={{ disabled: true, label: 'Select All (Disabled)' }} />

<Story
	name="Checked and Disabled"
	args={{ checked: true, disabled: true, label: 'Select All (Checked & Disabled)' }}
/>

<Story name="Custom Label" args={{ label: 'Select All Items' }} />
