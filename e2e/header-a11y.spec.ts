import { test, expect } from '@playwright/test';

const header = {
  langSwitcher: 'ul.header-lang',
  btnEn: () => ({ role: 'button' as const, name: /Switch to English|Auf Englisch umschalten/i }),
  btnDe: () => ({ role: 'button' as const, name: /Switch to German|Auf Deutsch umschalten/i }),
  btnContrast: () => ({
    role: 'button' as const,
    name: /Toggle high-contrast mode|Kontrastmodus umschalten/i,
  }),
};

// Helper: ensure we start in English and with a known HC preference
async function gotoHomeInEnglish(page) {
  // Force preference off before navigation so app reads it on boot
  await page.addInitScript(() => {
    try {
      localStorage.setItem('pref:high-contrast', 'off');
      localStorage.setItem('lang', 'en');
    } catch {}
  });
  await page.goto('/?lang=en');
}

test.describe('Header language switcher and high-contrast toggle', () => {
  test('Language switcher toggles active class and persists', async ({ page }) => {
    await gotoHomeInEnglish(page);

    // Expect switcher in English
    await expect(page.locator(header.langSwitcher)).toHaveAttribute(
      'aria-label',
      'Language switcher',
    );

    const en = page.getByRole(header.btnEn().role, { name: header.btnEn().name });
    const de = page.getByRole(header.btnDe().role, { name: header.btnDe().name });

    // EN is active, DE is not
    await expect(en).toHaveClass(/active/);
    await expect(de).not.toHaveClass(/active/);

    // Switch to German
    await de.click();

    // Persisted in localStorage
    const saved = await page.evaluate(() => localStorage.getItem('lang'));
    expect(saved).toBe('de');

    // ARIA on switcher updated and active class moved
    await expect(page.locator(header.langSwitcher)).toHaveAttribute('aria-label', 'Sprachauswahl');
    await expect(de).toHaveClass(/active/);
    await expect(en).not.toHaveClass(/active/);

    // Reload keeps German
    await page.reload();
    await expect(page.locator(header.langSwitcher)).toHaveAttribute('aria-label', 'Sprachauswahl');
  });

  test('URL ?lang param overrides saved language and persists', async ({ page }) => {
    // Save DE, but navigate with ?lang=en
    await page.addInitScript(() => {
      try {
        localStorage.setItem('lang', 'de');
      } catch {}
    });
    await page.goto('/?lang=en');

    // Should be English now per URL param
    await expect(page.locator(header.langSwitcher)).toHaveAttribute(
      'aria-label',
      'Language switcher',
    );

    // It should also persist the new language in localStorage
    const savedAfter = await page.evaluate(() => localStorage.getItem('lang'));
    expect(savedAfter).toBe('en');

    // Navigating without param should keep English (since it was persisted)
    await page.goto('/');
    await expect(page.locator(header.langSwitcher)).toHaveAttribute(
      'aria-label',
      'Language switcher',
    );
  });

  test('High-contrast toggle sets aria-pressed, body attribute, and persists', async ({ page }) => {
    await gotoHomeInEnglish(page);

    const btnContrast = page.getByRole(header.btnContrast().role, {
      name: header.btnContrast().name,
    });

    // Starts off
    await expect(btnContrast).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('body')).not.toHaveAttribute('data-theme', 'hc');

    // Toggle on
    await btnContrast.click();
    await expect(btnContrast).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'hc');

    let pref = await page.evaluate(() => localStorage.getItem('pref:high-contrast'));
    expect(pref).toBe('on');

    // Reload stays on
    await page.reload();
    await expect(btnContrast).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'hc');

    // Toggle off again
    await btnContrast.click();
    await expect(btnContrast).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('body')).not.toHaveAttribute('data-theme', 'hc');
    pref = await page.evaluate(() => localStorage.getItem('pref:high-contrast'));
    expect(pref).toBe('off');
  });
});
