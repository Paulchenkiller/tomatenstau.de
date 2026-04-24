import { test, expect } from '@playwright/test';

test.describe('Easter egg', () => {
  test('red dot click shows Easter egg overlay', async ({ page }) => {
    await page.goto('/');
    await page.locator('#dot-close').click();
    await expect(page.locator('#easter-egg')).toBeVisible();
  });

  test('Easter egg overlay shows the logo', async ({ page }) => {
    await page.goto('/');
    await page.locator('#dot-close').click();
    await expect(page.locator('#easter-egg img')).toBeAttached();
  });

  test('Easter egg overlay shows logout text', async ({ page }) => {
    await page.goto('/');
    await page.locator('#dot-close').click();
    await expect(page.locator('#easter-egg')).toContainText('logout');
    await expect(page.locator('#easter-egg')).toContainText('Connection to tomatenstau.de closed');
  });

  test('clicking Easter egg overlay dismisses it', async ({ page }) => {
    await page.goto('/');
    await page.locator('#dot-close').click();
    await expect(page.locator('#easter-egg')).toBeVisible();
    await page.locator('#easter-egg').click();
    await expect(page.locator('#easter-egg')).not.toBeVisible();
  });

  test('terminal is hidden while Easter egg is shown', async ({ page }) => {
    await page.goto('/');
    await page.locator('#dot-close').click();
    await page.waitForTimeout(400);
    await expect(page.locator('[aria-label="Terminal interface"]')).toBeHidden();
  });

  test('restart animation rebuilds all terminal sections', async ({ page }) => {
    await page.goto('/');
    await page.locator('#dot-close').click();
    await expect(page.locator('#easter-egg')).toBeVisible();
    await page.locator('#easter-egg').click();

    await expect(page.locator('#ts-neofetch')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('.exp-table')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[aria-label="Manual page for meik"]')).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator('#ts-cursor')).toBeVisible({ timeout: 12000 });
  });

  test('restart animation types the experience command', async ({ page }) => {
    await page.goto('/');
    await page.locator('#dot-close').click();
    await page.locator('#easter-egg').click();

    await expect(page.locator('#ts-exp .cmd')).toContainText('column -t experience.tsv', {
      timeout: 5000,
    });
  });

  test('restart animation types the man command', async ({ page }) => {
    await page.goto('/');
    await page.locator('#dot-close').click();
    await page.locator('#easter-egg').click();

    await expect(page.locator('#ts-man .cmd')).toContainText('man meik', { timeout: 10000 });
  });

  test('Easter egg can be triggered and dismissed multiple times', async ({ page }) => {
    await page.goto('/');

    for (let i = 0; i < 2; i++) {
      await page.locator('#dot-close').click();
      await expect(page.locator('#easter-egg')).toBeVisible();
      await page.locator('#easter-egg').click();
      await expect(page.locator('#easter-egg')).not.toBeVisible();
      await expect(page.locator('#ts-neofetch')).toBeVisible({ timeout: 3000 });
    }
  });
});
