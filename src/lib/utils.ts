/**
 * Utility functions for the help-desk application.
 */
import { page } from '$app/state';

/**
 * Checks if the current URL contains a search parameter with the specified name and value.
 * If it does not, navigates to the same URL with that search parameter added.
 *
 * @param name - The name of the search parameter to check/add
 * @param value - The value of the search parameter to check/add
 * @returns void
 */
export function ensureUrlParam(name: string, value: string): void {
	// Get the current URL from the page store
	const currentUrl = page.url;
	const url = new URL(currentUrl.href);

	// Check if the URL already has the parameter with the specified value
	const currentValue = url.searchParams.get(name);

	// If the parameter doesn't exist or has a different value, update the URL
	if (currentValue !== value) {
		// Set the parameter to the specified value
		url.searchParams.set(name, value);

		// Navigate to the new URL
		window.location.href = url.toString();
	}

	// If the parameter already exists with the specified value, do nothing
}
