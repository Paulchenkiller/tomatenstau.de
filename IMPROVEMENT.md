# Improvement Backlog

Last updated: 2026-03-20

## Verification Snapshot

Current branch state verified during the latest pass:

- `npm run lint` -> passed
- `npm run test:ci` -> passed
- `npm run build -- --configuration=production` -> local process still exits abnormally in this sandbox after emitting output
- `npm run e2e` -> still blocked in this sandbox because the Angular dev server cannot bind a local port (`listen EPERM`)

## Remaining Work

### High Priority

#### 1. Reduce remaining silent error handling

Status: mostly done

Done already:

- language URL-sync failures are logged explicitly in the header
- clipboard fallback paths now avoid false-positive success feedback
- SSR translation preload now distinguishes missing files from read/parse failures

Left:

- align the remaining browser preference helper duplication between bootstrap and header
- decide whether server-side preload warnings should be centralized behind a logger abstraction

#### 2. Improve type safety further

Status: mostly done

Done already:

- typed route metadata
- typed translation dictionaries for SSR/client translation loading
- removed several broad `any` usages and dead state
- removed remaining `any`/`Observable<any>` runtime usage under `src/app`
- tightened several router/document test stubs

Left:

- reduce remaining weak typing in tests where it still matters
- tighten ESLint rules incrementally once the remaining cases are addressed

### Medium Priority

#### 3. Refactor accessibility and theme styles

Why:

- [src/styles.css](/Users/meik/git/tomatenstaude/src/styles.css) still contains many global overrides and `!important` rules
- [src/css/main.scss](/Users/meik/git/tomatenstaude/src/css/main.scss) overlaps with those global rules

Next step:

- introduce clearer tokens and reduce blanket global overrides

#### 4. Verify E2E runtime outside this sandbox

Done already:

- removed fixed sleeps and brittle selectors from key E2E specs
- made Playwright host, port, and base URL environment-overridable
- kept the copy-button flow covered while tightening its failure behavior

Left:

- confirm the full Playwright/a11y flow in a normal local or CI environment

#### 5. Continue asset cleanup

Done already:

- removed clearly unreferenced image files

Left:

- decide whether source-only assets should live outside `src/assets`
- remove any remaining redundant originals once ownership is clear

#### 6. Re-test install without `legacy-peer-deps`

Why:

- `.npmrc` still sets `legacy-peer-deps=true`

Next step:

- verify install without that compatibility flag and remove it if no longer needed

### Lower Priority

#### 7. Strengthen SEO and structured data further

Done already:

- route-driven metadata is centralized

Left:

- expand richer metadata for tutorial/article pages if needed
- add SSR assertions for rendered metadata

#### 8. Improve build diagnostics

Why:

- local production build still ends abnormally in this sandbox even though output is emitted

Next step:

- verify build behavior in a normal local shell or CI runner and capture the exact failure mode

#### 9. Improve server hardening

Status: in progress

Done already:

- added baseline security headers in the SSR Express server
- moved static serving to `index: false` so SSR owns HTML responses
- added an explicit SSR error handler

Left:

- add CSP carefully after validating current asset/font/script usage
- enable HSTS only in a production HTTPS environment or at the CDN/proxy layer

#### 10. Normalize CI and deployment workflows

Why:

- workflow duplication and branch strategy drift still exist

Next step:

- align deploy, CI, and accessibility workflows
