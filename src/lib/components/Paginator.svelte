<script lang="ts">
	interface Props {
		/** Current item offset (0-based) */
		offset?: number;
		/** Number of items per page */
		limit?: number;
		/** Total number of items in the collection */
		total: number;
		/** Background color for the selected page */
		selectedColor?: string;
		/** Callback function when a page is selected */
		onPageChange?: (newOffset: number) => void;
	}

	const { offset = 0, limit = 10, total, selectedColor = '#e6f7ff', ...props }: Props = $props();

	// Calculate total number of pages
	let totalPages = $derived(Math.ceil(total / limit));

	// Calculate current page number (1-based for display)
	let currentPage = $derived(Math.floor(offset / limit) + 1);

	// Determine if previous/next buttons should be disabled
	let isPrevDisabled = $derived(currentPage <= 1);
	let isNextDisabled = $derived(currentPage >= totalPages);

	// Generate array of page numbers to display
	let pageNumbers = $derived(() => {
		// Always show first and last page
		// Show 2 pages on each side of current page when possible
		// Use ellipsis (...) for gaps

		const pages = [];
		const showEllipsisStart = currentPage > 4;
		const showEllipsisEnd = currentPage < totalPages - 3;

		// Always show page 1
		pages.push(1);

		// Show ellipsis after page 1 if needed
		if (showEllipsisStart) {
			pages.push('...');
		} else {
			// If we're not showing the start ellipsis, show page 2 if it exists
			if (totalPages >= 2) {
				pages.push(2);
			}
		}

		// Pages around current page
		for (
			let i = Math.max(3, currentPage - 2);
			i <= Math.min(totalPages - 2, currentPage + 2);
			i++
		) {
			// Only add if not already added and not going to be added later
			if ((showEllipsisStart || i > 2) && (showEllipsisEnd || i < totalPages - 1)) {
				pages.push(i);
			}
		}

		// Show ellipsis before last page if needed
		if (showEllipsisEnd) {
			pages.push('...');
		} else {
			// If we're not showing the end ellipsis, show the second-to-last page if it exists
			if (totalPages >= 2) {
				pages.push(totalPages - 1);
			}
		}

		// Always show the last page if it's different from the first
		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	});

	// Handle page selection
	function selectPage(page: number | string) {
		if (typeof page === 'number' && page !== currentPage) {
			const newOffset = (page - 1) * limit;
			if (props.onPageChange) {
				props.onPageChange(newOffset);
			}
		}
	}

	// Handle previous page
	function goToPrevPage() {
		if (!isPrevDisabled) {
			const newOffset = Math.max(0, offset - limit);
			if (props.onPageChange) {
				props.onPageChange(newOffset);
			}
		}
	}

	// Handle next page
	function goToNextPage() {
		if (!isNextDisabled) {
			const newOffset = Math.min(total - 1, offset + limit);
			if (props.onPageChange) {
				props.onPageChange(newOffset);
			}
		}
	}

	// Style for the selected page
	let selectedStyle = $derived(selectedColor ? `background-color: ${selectedColor}` : '');
</script>

<div class="paginator" {...props}>
	<button
		class="paginator-nav prev"
		on:click={goToPrevPage}
		disabled={isPrevDisabled}
		aria-label="Previous page"
	>
		&lt; Previous
	</button>

	<div class="paginator-pages">
		{#each pageNumbers() as page}
			{#if page === '...'}
				<span class="paginator-ellipsis">...</span>
			{:else}
				<button
					class="paginator-page"
					class:selected={page === currentPage}
					style={page === currentPage ? selectedStyle : ''}
					on:click={() => selectPage(page)}
					aria-label={`Page ${page}`}
					aria-current={page === currentPage ? 'page' : undefined}
				>
					{page}
				</button>
			{/if}
		{/each}
	</div>

	<button
		class="paginator-nav next"
		on:click={goToNextPage}
		disabled={isNextDisabled}
		aria-label="Next page"
	>
		Next &gt;
	</button>
</div>

<style>
	.paginator {
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size: 14px;
		color: #333;
		margin: 20px 0;
	}

	.paginator-pages {
		display: flex;
		align-items: center;
		margin: 0 10px;
	}

	.paginator-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 32px;
		height: 32px;
		margin: 0 4px;
		padding: 0 6px;
		border: none;
		background-color: transparent;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		color: #333;
		transition: all 0.2s ease;
	}

	.paginator-page:hover:not(.selected) {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.paginator-page.selected {
		font-weight: 700;
		color: #1a1a1a;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
	}

	.paginator-ellipsis {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 32px;
		height: 32px;
		margin: 0 4px;
		color: #999;
	}

	.paginator-nav {
		padding: 6px 12px;
		border: none;
		background-color: transparent;
		border-radius: 4px;
		cursor: pointer;
		color: #1890ff;
		transition: all 0.2s ease;
	}

	.paginator-nav:hover:not(:disabled) {
		background-color: rgba(24, 144, 255, 0.1);
	}

	.paginator-nav:disabled {
		color: #d9d9d9;
		cursor: not-allowed;
	}
</style>
