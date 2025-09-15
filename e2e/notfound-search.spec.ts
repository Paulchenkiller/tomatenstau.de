import { test, expect } from '@playwright/test';

test.describe('404 page quick search', () => {
  test('Filters topics and navigates', async ({ page }) => {
    await page.goto('/this-route-does-not-exist?lang=en');

    // Heading visible
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();

    const input = page.locator('#search404');
    await expect(input).toBeVisible();

    // Type a query that should match Python
    await input.fill('py');

    // We should see a link named Python
    const pyLink = page.getByRole('link', { name: 'Python' });
    await expect(pyLink).toBeVisible();

    // Click and land on Python index
    await pyLink.click();
    await expect(page).toHaveURL(/\/code\/python$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Python/);
  });
});
