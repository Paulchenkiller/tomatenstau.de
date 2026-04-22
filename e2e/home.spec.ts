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

  test('hreflang alternate links are present', async ({ page }) => {
    await page.goto('/');
    const enAlt = page.locator('link[rel="alternate"][hreflang="en"]');
    const deAlt = page.locator('link[rel="alternate"][hreflang="de"]');
    await expect(enAlt).toBeAttached();
    await expect(deAlt).toBeAttached();
  });

  test('skip link is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.skip-link')).toBeAttached();
  });

  test('shows name heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Meik Geldmacher');
  });

  test('shows job title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h2.intro__title')).toContainText('Software');
  });

  test('profile photo has non-empty alt text', async ({ page }) => {
    await page.goto('/');
    const img = page.locator('img.intro__photo');
    await expect(img).toBeVisible();
    const alt = await img.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt!.length).toBeGreaterThan(0);
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

  test('high-contrast toggle button is present', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('#hc-toggle');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('aria-pressed');
  });

  test('high-contrast toggle persists preference', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('#hc-toggle');
    await btn.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'hc');
    await btn.click();
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(theme).not.toBe('hc');
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

  test('meta description is present', async ({ page }) => {
    await page.goto('/de/');
    const meta = page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute('content', /.+/);
  });

  test('profile photo has non-empty alt text', async ({ page }) => {
    await page.goto('/de/');
    const img = page.locator('img.intro__photo');
    await expect(img).toBeVisible();
    const alt = await img.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt!.length).toBeGreaterThan(0);
  });

  test('passes WCAG 2.1 AA accessibility audit', async ({ page }) => {
    await page.goto('/de/');
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
