# Accessibility Notes

This repository includes accessibility-focused implementation and automated checks, but this file is intentionally limited to statements that match the current codebase.

## Current Implementation

The current app includes:

- skip links in [src/app/app.component.html](/Users/meik/git/tomatenstaude/src/app/app.component.html)
- a main landmark in [src/app/content/content.component.html](/Users/meik/git/tomatenstaude/src/app/content/content.component.html)
- language switching and a high-contrast toggle in [src/app/header/header.component.html](/Users/meik/git/tomatenstaude/src/app/header/header.component.html)
- translated `lang` attribute updates and route-based metadata updates in [src/app/app.component.ts](/Users/meik/git/tomatenstaude/src/app/app.component.ts)
- accessibility-related global styles in [src/styles.css](/Users/meik/git/tomatenstaude/src/styles.css)
- Playwright + axe coverage in [e2e/accessibility.spec.ts](/Users/meik/git/tomatenstaude/e2e/accessibility.spec.ts)

## Available Checks

```bash
npm run a11y:test
npm run a11y:ci
```

Related files:

- [e2e/accessibility.spec.ts](/Users/meik/git/tomatenstaude/e2e/accessibility.spec.ts)
- [.github/workflows/accessibility.yml](/Users/meik/git/tomatenstaude/.github/workflows/accessibility.yml)

## Verified State During Recent Cleanup

Verified locally in this repository on 2026-03-20:

- `npm run lint` passed
- `npm run test:ci` passed
- `npm run build -- --configuration=production --verbose` passed
- `npx playwright install chromium` passed
- `npm run a11y:test` passed
- `npm run a11y:ci` passed

That means the accessibility test code exists, is wired into the repo, and now passes on the current branch.

## Known Gaps

- Accessibility claims in previous versions of this file were broader than what was directly verified.
- Some accessibility styling is still handled through broad global overrides and `!important`, which should be refined.

## Next Improvements

- reduce global CSS overrides in favor of scoped component styling and clearer tokens
