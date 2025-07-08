<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TicketDetail from '$lib/components/TicketDetail.svelte';
	import { Ticket, Category } from '$lib/models';

	// Sample tickets and categories for stories
	const openTicket = new Ticket(
		1,
		'Open Ticket',
		'This is an open ticket with a detailed description that explains the issue.',
		true,
		1
	);
	const closedTicket = new Ticket(
		2,
		'Closed Ticket',
		'This is a closed ticket with a resolution.',
		false,
		2
	);
	const longNameTicket = new Ticket(
		3,
		'This is a very long ticket name that might wrap to multiple lines',
		'This is a ticket with a long name and a detailed description that explains the issue in great detail.',
		true,
		3
	);
	const longDescriptionTicket = new Ticket(
		4,
		'Ticket with Long Description',
		'This is a ticket with a very long description that goes into great detail about the issue. ' +
			'It includes multiple sentences and paragraphs to fully explain the problem. ' +
			'The description is so long that it will likely wrap to multiple lines and test how the component handles long text. ' +
			'This is important to ensure that the component displays correctly in all cases.',
		true,
		1
	);

	// Sample categories for stories
	const bugCategory = new Category(1, '#ff5252', 'Bug', 'Software defects and issues');
	const featureCategory = new Category(2, '#4caf50', 'Feature', 'New feature requests');
	const supportCategory = new Category(3, '#2196f3', 'Support', 'Customer support inquiries');

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/TicketDetail',
		component: TicketDetail,
		tags: ['autodocs'],
		argTypes: {
			ticket: { control: 'object' },
			category: { control: 'object' }
		}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story
	name="Open Ticket"
	args={{
		ticket: openTicket,
		category: bugCategory
	}}
/>

<Story
	name="Closed Ticket"
	args={{
		ticket: closedTicket,
		category: featureCategory
	}}
/>

<Story
	name="Long Name Ticket"
	args={{
		ticket: longNameTicket,
		category: supportCategory
	}}
/>

<Story
	name="Long Description Ticket"
	args={{
		ticket: longDescriptionTicket,
		category: bugCategory
	}}
/>

<Story
	name="Different Category Colors"
	args={{
		ticket: openTicket,
		category: new Category(4, '#9c27b0', 'Enhancement', 'Improvements to existing features')
	}}
/>
