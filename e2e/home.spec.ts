import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('EN home page', () => {
  test('loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Meik Geldmacher/);
  });

  test('html lang attribute is en', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('meta description is present', async ({ page }) => {
    await page.goto('/');
    const meta = page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute('content', /.+/);
  });

  test('hreflang alternate link is present', async ({ page }) => {
    await page.goto('/');
    const enAlt = page.locator('link[rel="alternate"][hreflang="en"]');
    await expect(enAlt).toBeAttached();
  });

  test('skip link is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.skip-link')).toBeAttached();
  });

  test('terminal interface is rendered', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[aria-label="Terminal interface"]')).toBeVisible();
  });

  test('profile photo is visible', async ({ page }) => {
    await page.goto('/');
    const img = page.locator('.chafa-img');
    await expect(img).toBeVisible();
  });

  test('social links are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(`a[href*="github.com"]`).first()).toBeVisible();
    await expect(page.locator(`a[href*="linkedin.com"]`).first()).toBeVisible();
  });

  test('passes WCAG 2.1 AA accessibility audit', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe('404 page', () => {
  test('returns 404 status for unknown path', async ({ page }) => {
    const response = await page.goto('/does-not-exist');
    expect(response?.status()).toBe(404);
  });

  test('shows not-found heading', async ({ page }) => {
    await page.goto('/does-not-exist');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('has link back to home', async ({ page }) => {
    await page.goto('/does-not-exist');
    const homeLink = page.locator('.not-found a[href="/"]');
    await expect(homeLink).toBeVisible();
  });
});
