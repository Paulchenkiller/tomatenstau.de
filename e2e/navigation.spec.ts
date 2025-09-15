import { test, expect } from '@playwright/test';

// Force English to make assertions deterministic
const goEn = async (page, path: string) =>
  page.goto(`${path}${path.includes('?') ? '&' : '?'}lang=en`);

const expectH1 = async (page, re: RegExp) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(re);
};

test.describe('Navigation across languages and sample subpages', () => {
  test('Perl index and Regex Greedy/Lazy article', async ({ page }) => {
    await goEn(page, '/code/perl');
    await expectH1(page, /Perl/);
    await page.getByRole('link', { name: /Regex\s*Greedy\/Lazy/i }).click();
    await expectH1(page, /Regex\s*Greedy\/Lazy/i);
  });

  test('Python index and Mutable Default article', async ({ page }) => {
    await goEn(page, '/code/python');
    await expectH1(page, /Python/);
    await page.getByRole('link', { name: /Mutable\s*Default/i }).click();
    await expectH1(page, /Mutable\s*Default/i);
  });

  test('Java index and equals & hashCode article', async ({ page }) => {
    await goEn(page, '/code/java');
    await expectH1(page, /Java/);
    await page.getByRole('link', { name: /equals\s*&\s*hashCode/i }).click();
    await expectH1(page, /equals\s*&\s*hashCode/i);
  });

  test('JavaScript/TypeScript index and Hoisting & TDZ article', async ({ page }) => {
    await goEn(page, '/code/javascript');
    await expectH1(page, /JavaScript\/TypeScript/);
    await page.getByRole('link', { name: /Hoisting\s*&\s*TDZ/i }).click();
    await expectH1(page, /Hoisting\s*&\s*TDZ/i);
  });

  test('Haskell index and Lazy Evaluation article', async ({ page }) => {
    await goEn(page, '/code/haskell');
    await expectH1(page, /Haskell/);
    await page.getByRole('link', { name: /Lazy\s*Evaluation/i }).click();
    await expectH1(page, /Lazy\s*Evaluation/i);
  });

  test('Prolog index and Hanoi article', async ({ page }) => {
    await goEn(page, '/code/prolog');
    await expectH1(page, /Prolog/);
    await page.getByRole('link', { name: /Hanoi/ }).click();
    await expectH1(page, /Hanoi/);
  });
});
