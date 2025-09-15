import { test, expect } from '@playwright/test';

// Helper to read aria-label of language switcher
const headerLangSwitcher = 'ul.header-lang';

// Ensure base language is consistent for assertions
test.describe('Core paths and language switch', () => {
  test('Home renders and has language switcher', async ({ page }) => {
    await page.goto('/');
    // Name headline exists
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Meik Geldmacher/);
    // Language switcher present with aria-label in either language
    const aria = await page.getAttribute(headerLangSwitcher, 'aria-label');
    expect(aria === 'Language switcher' || aria === 'Sprachauswahl').toBeTruthy();
  });

  test('Navigate to Code and into Java equals-hashCode article', async ({ page }) => {
    await page.goto('/code');
    // Code page headline
    await expect(page.getByRole('heading', { name: /Code/i })).toBeVisible();

    // Click into Java
    await page.getByRole('link', { name: /^Java$/ }).click();
    await expect(page).toHaveURL(/\/code\/java$/);

    // Click into equals & hashCode
    await page.getByRole('link', { name: /equals\s*&\s*hashCode/i }).click();
    await expect(page).toHaveURL(/\/code\/java\/equals-hashcode$/);

    // Article headline should be visible
    await expect(page.getByRole('heading', { name: /equals\s*&\s*hashCode/i })).toBeVisible();
  });

  test('Language switch persists across reloads', async ({ page }) => {
    await page.goto('/');

    // Click the DE button using its aria-label (initially in EN by default)
    const switchDe = page.getByRole('button', { name: /Switch to German|Auf Deutsch umschalten/i });
    await switchDe.click();

    // localStorage should hold "de"
    const lang = await page.evaluate(() => localStorage.getItem('lang'));
    expect(lang).toBe('de');

    // aria-label of switcher should be German now
    await expect(page.locator(headerLangSwitcher)).toHaveAttribute('aria-label', 'Sprachauswahl');

    // Reload and verify it stays German
    await page.reload();
    await expect(page.locator(headerLangSwitcher)).toHaveAttribute('aria-label', 'Sprachauswahl');
  });

  test('404 page shows and links back home', async ({ page }) => {
    // Force EN via URL param for deterministic text
    await page.goto('/?lang=en');
    await page.goto('/definitely-not-existing');

    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    await page.getByRole('link', { name: 'Back to home' }).click();
    await expect(page).toHaveURL(/\/?(#.*)?$/);
  });
});
