import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('WCAG 2.1 AA Compliance Audit', () => {
  test('Homepage should be accessible', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Code section overview should be accessible', async ({ page }) => {
    await page.goto('/code');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('JavaScript tutorials should be accessible', async ({ page }) => {
    await page.goto('/code/javascript');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Contact page should be accessible', async ({ page }) => {
    await page.goto('/contact');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('404 page should be accessible', async ({ page }) => {
    await page.goto('/non-existent-page');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Language switching should be accessible', async ({ page }) => {
    await page.goto('/');

    // Wait for language buttons to load
    await page.waitForSelector('.header-lang button', { timeout: 10000 });

    // Test German language - use more reliable selector
    const germanButton = page.locator('.header-lang button').nth(1); // Second button is German
    await germanButton.click();
    await page.waitForTimeout(1000);

    let accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);

    // Test English language - use more reliable selector
    const englishButton = page.locator('.header-lang button').nth(0); // First button is English
    await englishButton.click();
    await page.waitForTimeout(1000);

    accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Code examples with syntax highlighting should be accessible', async ({ page }) => {
    await page.goto('/code/javascript/closures-scope');
    await page.waitForTimeout(2000); // Wait for syntax highlighting to load

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Deep navigation pages should be accessible', async ({ page }) => {
    await page.goto('/code/javascript/closures-scope');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);

    // Test that the page content is accessible and properly structured
    const mainContent = await page.locator('main');
    await expect(mainContent).toBeVisible();
    await expect(mainContent).toHaveAttribute('id', 'main-content');
  });

  test('All form controls should have proper labels', async ({ page }) => {
    await page.goto('/contact');

    // Check that all input elements have associated labels
    const inputs = await page.locator('input, textarea, select');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      // Each input should have either an id with corresponding label, aria-label, or aria-labelledby
      const hasLabel = id ? (await page.locator(`label[for="${id}"]`).count()) > 0 : false;

      expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
    }
  });

  test('Keyboard navigation should work throughout the site', async ({ page }) => {
    await page.goto('/');

    // Test Tab navigation
    await page.keyboard.press('Tab');
    let focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Continue tabbing through several elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      focusedElement = await page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }

    // Test Shift+Tab (reverse navigation)
    await page.keyboard.press('Shift+Tab');
    focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('Focus should be visible for all interactive elements', async ({ page }) => {
    await page.goto('/');

    // Get all focusable elements
    const focusableElements = await page.locator(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );

    const count = await focusableElements.count();

    for (let i = 0; i < Math.min(count, 20); i++) {
      // Test first 20 elements
      const element = focusableElements.nth(i);
      await element.focus();

      // Check that focus is visible (this is a simplified check)
      await expect(element).toBeFocused();
    }
  });

  test('Images should have appropriate alt text', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');

      // Images should have alt text or role="presentation"
      expect(alt !== null || role === 'presentation').toBeTruthy();
    }
  });
});
