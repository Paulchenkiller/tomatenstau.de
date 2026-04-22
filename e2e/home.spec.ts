import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('EN home page', () => {
  test('loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Meik Geldmacher/);
  });

  test('shows name heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Meik Geldmacher');
  });

  test('shows job title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h2.intro__title')).toContainText('Software');
  });

  test('social links are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[aria-label*="GitHub"]').first()).toBeVisible();
    await expect(page.locator('a[aria-label*="LinkedIn"]').first()).toBeVisible();
  });

  test('lang switcher links exist', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[data-lang="en"]')).toBeVisible();
    await expect(page.locator('a[data-lang="de"]')).toBeVisible();
  });

  test('passes WCAG 2.1 AA accessibility audit', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe('DE home page', () => {
  test('loads and shows name', async ({ page }) => {
    await page.goto('/de/');
    await expect(page.locator('h1')).toContainText('Meik Geldmacher');
  });

  test('shows German job title', async ({ page }) => {
    await page.goto('/de/');
    await expect(page.locator('h2.intro__title')).toContainText('Architekt');
  });

  test('html lang attribute is de', async ({ page }) => {
    await page.goto('/de/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  });

  test('passes WCAG 2.1 AA accessibility audit', async ({ page }) => {
    await page.goto('/de/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
