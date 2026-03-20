import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('WCAG 2.1 AA Compliance Audit', () => {
  const langSwitcher = 'ul.header-lang';

  test('Homepage should be accessible', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Code section overview should be accessible', async ({ page }) => {
    await page.goto('/code');
    await expect(page.getByRole('heading', { name: /Code/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Python/i })).toBeVisible();

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

  test('404 page should be accessible', async ({ page }) => {
    await page.goto('/non-existent-page');
    await expect(page.getByRole('heading', { name: /Page not found/i })).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Language switching should be accessible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(langSwitcher)).toHaveAttribute('aria-label', 'Language switcher');

    const germanButton = page.getByRole('button', {
      name: /Switch to German|Auf Deutsch umschalten/i,
    });
    await germanButton.click();
    await expect(page.locator(langSwitcher)).toHaveAttribute('aria-label', 'Sprachauswahl');

    let accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);

    const englishButton = page.getByRole('button', {
      name: /Switch to English|Auf Englisch umschalten/i,
    });
    await englishButton.click();
    await expect(page.locator(langSwitcher)).toHaveAttribute('aria-label', 'Language switcher');

    accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Code examples with syntax highlighting should be accessible', async ({ page }) => {
    await page.goto('/code/javascript/closures-scope');
    await expect(page.locator('button.copy-btn').first()).toBeVisible();

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

    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
    await expect(mainContent).toHaveAttribute('id', 'main-content');
  });

  test('404 page search controls should have proper labels', async ({ page }) => {
    await page.goto('/non-existent-page');
    await expect(page.getByRole('heading', { name: /Page not found/i })).toBeVisible();

    const inputs = page.locator('input, textarea, select');
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
    await expect(page.getByRole('main')).toBeVisible();

    await page.keyboard.press('Tab');
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }

    await page.keyboard.press('Shift+Tab');
    focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('Focus should be visible for all interactive elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('main')).toBeVisible();

    const focusableElements = page.locator(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );

    const count = await focusableElements.count();

    for (let i = 0; i < Math.min(count, 20); i++) {
      const element = focusableElements.nth(i);
      await element.focus();
      await expect(element).toBeFocused();
    }
  });

  test('Images should have appropriate alt text', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
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
