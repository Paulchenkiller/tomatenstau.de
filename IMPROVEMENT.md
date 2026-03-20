# Improvement Backlog

Last updated: 2026-03-20

## Verified Current State

- `npm ci` passes without `.npmrc`
- `npm run lint` passes
- `npm run test:ci` passes
- `npm run build -- --configuration=production --verbose` passes and writes `dist/tomatenstaude`

## Remaining Work

### High Priority

#### 1. Restore browser-based verification on the supported runtime

- Run Playwright install and browser-based checks on Node 20 LTS
- Investigate why `npx playwright install chromium` fails on Node 25 during the FFmpeg step and leaves `chromium_headless_shell` missing
- Re-run `npm run e2e` and `npm run a11y:test` after browser installation succeeds

#### 2. Fix the accessibility audit browser-driver mismatch

- `npm run a11y:ci` currently reaches the audit step and then fails because ChromeDriver `144` does not match the installed Chrome `146`
- Align the axe/ChromeDriver path with the browser version used in CI/local verification

### Medium Priority

#### 3. Continue low-risk type and test cleanup

- reduce the remaining weak typing in tests where it still affects maintainability
- tighten ESLint rules incrementally only after those cases are addressed

#### 4. Finish the last safe CSS cleanup slice

- continue removing redundant global contrast overrides where they only restate existing theme defaults
- treat broader changes in [src/styles.css](/Users/meik/git/tomatenstaude/src/styles.css) as browser-verified work

### Lower Priority

#### 5. Optional server and deployment hardening

- add CSP only after validating the current asset, font, and script sources
- enable HSTS only at the final HTTPS edge
- consider migrating GitHub Pages deployment away from the personal `ACCESS_TOKEN` secret to the native Pages flow
