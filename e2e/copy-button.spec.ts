import { test, expect } from '@playwright/test';

// Verify accessible copy buttons are injected for code blocks and provide feedback

test.describe('Code copy buttons', () => {
  test('Button exists with aria-label, shows feedback on click, then reverts', async ({ page }) => {
    await page.goto('/code/python?lang=en');

    const pre = page.locator('pre').first();
    await expect(pre).toBeVisible();

    const copyBtn = pre.locator('button.copy-btn');
    await expect(copyBtn).toHaveText('Copy code to clipboard');
    await expect(copyBtn).toHaveAttribute('aria-label', 'Copy code to clipboard');

    await copyBtn.click();

    // Shows "Copied!" feedback, then reverts back to original label
    await expect(copyBtn).toHaveText('Copied!');
    await expect(copyBtn).toHaveAttribute('aria-label', 'Copied!');

    await expect(copyBtn).toHaveText('Copy code to clipboard', { timeout: 3000 });
    await expect(copyBtn).toHaveAttribute('aria-label', 'Copy code to clipboard');
  });
});
