import { test, expect } from '@playwright/test';

test.describe('APOD App', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });
	});

	test('renders the header with title and eyebrow', async ({ page }) => {
		await expect(page.getByText('NASA - Astornomy Picture of the Day')).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Explore Cosmos' })).toBeVisible();
	});

	test('renders the date picker and fetch button', async ({ page }) => {
		await expect(page.getByLabel('Date')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Fetch Picture' })).toBeVisible();
	});

	test('shows error when fetch is clicked with no date selected', async ({ page }) => {
		const button = page.getByRole('button', { name: 'Fetch Picture' });
		await expect(button).toBeEnabled();
		await button.click();
		await expect(page.getByText('Please pick a date first!')).toBeVisible({ timeout: 3000 });
	});

	test('date input respects min and max bounds', async ({ page }) => {
		const input = page.getByLabel('Date');
		await expect(input).toHaveAttribute('min', '1995-06-16');
		const max = await input.getAttribute('max');
		const today = new Date().toISOString().split('T')[0];
		expect(max).toBe(today);
	});

	test('fetch button is enabled by default', async ({ page }) => {
		await expect(page.getByRole('button', { name: 'Fetch Picture' })).toBeEnabled();
	});

	test('no card is shown on initial load', async ({ page }) => {
		await expect(page.locator('.card')).not.toBeVisible();
	});
});
