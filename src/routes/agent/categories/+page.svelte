<script lang="ts">
	import type { PageProps } from './$types';
	import Button from '$lib/components/Button.svelte';
	import { Category } from '$lib/models';

	let { data }: PageProps = $props();

	// State for the form
	let formMode: 'create' | 'update' = $state('create');
	let formError: string = $state('');
	let formSuccess: boolean = $state(false);

	// Form fields
	let id: number = $state(0);
	let name: string = $state('');
	let description: string = $state('');
	let color: string = $state('#000000');

	// Reset form fields
	function resetForm() {
		formMode = 'create';
		id = 0;
		name = '';
		description = '';
		color = '#000000';
		formError = '';
		formSuccess = false;
	}

	// Set form to update mode with the selected category
	function editCategory(category: Category) {
		formMode = 'update';
		id = category.id;
		name = category.name || '';
		description = category.description || '';
		color = category.color || '#000000';
		formError = '';
		formSuccess = false;
	}
</script>

<svelte:head>
	<title>Category Management</title>
</svelte:head>

<div class="container">
	<div class="header">
		<a href="/agent">Home</a>
		<h1>Category Management</h1>
	</div>

	<div class="content">
		<div class="categories-list">
			<h2>Categories</h2>
			{#if data.categories && data.categories.length > 0}
				<table>
					<thead>
						<tr>
							<th>Color</th>
							<th>Name</th>
							<th>Description</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.categories as category (category.id)}
							<tr>
								<td>
									<div class="color-preview" style="background-color: {category.color}"></div>
								</td>
								<td>{category.name}</td>
								<td>{category.description || ''}</td>
								<td>
									<div class="actions">
										<button class="edit-btn" onclick={() => editCategory(category)}>Edit</button>
										<form action="?/delete" method="POST">
											<input type="hidden" name="id" value={category.id} />
											<button class="delete-btn" type="submit">Delete</button>
										</form>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<p>No categories found. Create one below.</p>
			{/if}
		</div>

		<div class="category-form">
			<h2>{formMode === 'create' ? 'Create New Category' : 'Update Category'}</h2>

			{#if formError}
				<div class="error">{formError}</div>
			{/if}

			{#if formSuccess}
				<div class="success">
					{formMode === 'create'
						? 'Category created successfully!'
						: 'Category updated successfully!'}
				</div>
			{/if}

			<form action={formMode === 'create' ? '?/create' : '?/update'} method="POST">
				{#if formMode === 'update'}
					<input type="hidden" name="id" value={id} />
				{/if}

				<div class="form-group">
					<label for="name">Name</label>
					<input type="text" id="name" name="name" bind:value={name} required />
				</div>

				<div class="form-group">
					<label for="description">Description</label>
					<textarea id="description" name="description" bind:value={description} rows="3"
					></textarea>
				</div>

				<div class="form-group">
					<label for="color">Color</label>
					<div class="color-input">
						<input type="color" id="color" name="color" bind:value={color} />
						<span class="color-value">{color}</span>
					</div>
				</div>

				<div class="form-actions">
					<Button
						primary={true}
						label={formMode === 'create' ? 'Create Category' : 'Update Category'}
						kind="submit"
					/>

					{#if formMode === 'update'}
						<Button kind="button" primary={false} onclick={resetForm}>Cancel</Button>
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}

	.header {
		margin-bottom: 2rem;
	}

	.content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.content {
			grid-template-columns: 3fr 2fr;
		}
	}

	.categories-list {
		margin-bottom: 2rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
	}

	th,
	td {
		padding: 0.5rem;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}

	th {
		background-color: #f5f5f5;
	}

	.color-preview {
		width: 24px;
		height: 24px;
		border-radius: 4px;
		border: 1px solid #ddd;
	}

	.actions {
		display: flex;
		gap: 0.5rem;
	}

	.edit-btn,
	.delete-btn {
		padding: 0.25rem 0.5rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.875rem;
	}

	.edit-btn {
		background-color: #4caf50;
		color: white;
	}

	.delete-btn {
		background-color: #f44336;
		color: white;
	}

	.category-form {
		background-color: #f9f9f9;
		padding: 1.5rem;
		border-radius: 8px;
		border: 1px solid #ddd;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	input[type='text'],
	textarea {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
	}

	.color-input {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	input[type='color'] {
		width: 50px;
		height: 50px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.color-value {
		font-family: monospace;
	}

	.form-actions {
		display: flex;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.error {
		background-color: #ffebee;
		color: #c62828;
		padding: 0.75rem;
		border-radius: 4px;
		margin-bottom: 1rem;
	}

	.success {
		background-color: #e8f5e9;
		color: #2e7d32;
		padding: 0.75rem;
		border-radius: 4px;
		margin-bottom: 1rem;
	}
</style>
