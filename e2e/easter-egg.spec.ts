import { test, expect } from '@playwright/test';

test.describe('Interactive terminal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('body').click();
  });

  test('typing a known command shows coloured prompt echo and response', async ({ page }) => {
    await page.keyboard.type('whoami');
    await page.keyboard.press('Enter');
    const block = page.locator('#ts-cmd-output > div').last();
    await expect(block).toContainText('meik@tomatenstau.de');
    await expect(block).toContainText('whoami');
  });

  test('unknown command shows zsh error', async ({ page }) => {
    await page.keyboard.type('foobar');
    await page.keyboard.press('Enter');
    await expect(page.locator('#ts-cmd-output')).toContainText('zsh: command not found: foobar');
  });

  test('help command shows multiple lines', async ({ page }) => {
    await page.keyboard.type('help');
    await page.keyboard.press('Enter');
    const response = page.locator('#ts-cmd-output .cmd-response').last();
    await expect(response).toContainText('available commands:');
    await expect(response).toContainText('whoami');
    await expect(response).toContainText('clear');
  });

  test('clear command empties the output', async ({ page }) => {
    await page.keyboard.type('whoami');
    await page.keyboard.press('Enter');
    await expect(page.locator('#ts-cmd-output')).not.toBeEmpty();
    await page.keyboard.type('clear');
    await page.keyboard.press('Enter');
    await expect(page.locator('#ts-cmd-output')).toBeEmpty();
  });

  test('exit command triggers the easter egg overlay', async ({ page }) => {
    await page.keyboard.type('exit');
    await page.keyboard.press('Enter');
    await expect(page.locator('#easter-egg')).toBeVisible({ timeout: 2000 });
  });

  test('input display shows typed text and clears after enter', async ({ page }) => {
    await page.keyboard.type('ls');
    await expect(page.locator('#ts-input-display')).toHaveText('ls');
    await page.keyboard.press('Enter');
    await expect(page.locator('#ts-input-display')).toHaveText('');
  });

  test('backspace removes last character from input display', async ({ page }) => {
    await page.keyboard.type('lss');
    await page.keyboard.press('Backspace');
    await expect(page.locator('#ts-input-display')).toHaveText('ls');
  });

  test('make coffee shows brewing progress and success message', async ({ page }) => {
    await page.keyboard.type('make coffee');
    await page.keyboard.press('Enter');
    await expect(page.locator('#ts-cmd-output .cmd-response').last()).toContainText('Brewing', {
      timeout: 3000,
    });
    await expect(page.locator('#ts-cmd-output .cmd-response').last()).toContainText(
      'Coffee ready',
      { timeout: 5000 },
    );
  });
});

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
