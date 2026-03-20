# Improvement Backlog

Last updated: 2026-03-20

## Verification Snapshot

Current branch state verified during the latest pass:

- `npm run lint` -> passed
- `npm run test:ci` -> passed
- `npm run build -- --configuration=production --verbose` -> emits a complete `dist/tomatenstaude` tree, then still exits abnormally in this sandbox
- `npm run e2e` -> still blocked in this sandbox because the Angular dev server cannot bind a local port (`listen EPERM`)
- `npm_config_legacy_peer_deps=false npm ci` -> exposes peer-dependency friction around `@stryker-mutator/typescript-checker@9.1.1`

## Remaining Work

### High Priority

#### 1. Reduce remaining silent error handling

Status: mostly done

Done already:

- language URL-sync failures are logged explicitly in the header
- clipboard fallback paths now avoid false-positive success feedback
- SSR translation preload now distinguishes missing files from read/parse failures

Left:

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

- reduce remaining weak typing in tests where it still matters, especially [header.component.spec.ts](/Users/meik/git/tomatenstaude/src/app/header/header.component.spec.ts)
- tighten ESLint rules incrementally once the remaining cases are addressed

### Medium Priority

#### 3. Refactor accessibility and theme styles

Status: in progress

Done already:

- removed stale breadcrumb-era selectors from [src/styles.css](/Users/meik/git/tomatenstaude/src/styles.css)
- introduced shared global CSS tokens for button/code colors to reduce literal duplication
- moved base document text/color ownership further into [src/css/main.scss](/Users/meik/git/tomatenstaude/src/css/main.scss)
- removed another batch of duplicated global body/paragraph/heading contrast overrides from [src/styles.css](/Users/meik/git/tomatenstaude/src/styles.css)

Why:

- [src/styles.css](/Users/meik/git/tomatenstaude/src/styles.css) still contains many global overrides and `!important` rules
- [src/css/main.scss](/Users/meik/git/tomatenstaude/src/css/main.scss) overlaps with those global rules

Next step:

- continue removing blanket `!important` overrides, especially global form/code contrast duplication

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

- either upgrade or align the `@stryker-mutator/*` package family, or keep the flag with an explicit reason documented

### Lower Priority

#### 7. Strengthen SEO and structured data further

Done already:

- route-driven metadata is centralized

Left:

- expand richer metadata for tutorial/article pages if needed
- add SSR assertions for rendered metadata

#### 8. Improve build diagnostics

Why:

- local production build still ends abnormally in this sandbox even though output and prerender artifacts are emitted

Next step:

- verify the exact late-stage failure mode in a normal local shell or CI runner and decide whether it is sandbox-only

#### 9. Improve server hardening

Status: in progress

Done already:

- added baseline security headers in the SSR Express server
- moved static serving to `index: false` so SSR owns HTML responses
- added an explicit SSR error handler
- disabled Express `x-powered-by`

Left:

- add CSP carefully after validating current asset/font/script usage
- enable HSTS only in a production HTTPS environment or at the CDN/proxy layer

#### 10. Normalize CI and deployment workflows

Status: mostly done

Done already:

- aligned workflows around `main`
- removed brittle docs-only skip logic from [ci.yml](/Users/meik/git/tomatenstaude/.github/workflows/ci.yml)
- aligned accessibility scripts with env-driven host/port handling
- documented current deploy-branch and token assumptions in [README.md](/Users/meik/git/tomatenstaude/README.md)

Left:

- consider migrating GitHub Pages deploy away from the personal `ACCESS_TOKEN` secret to the native Pages flow
- reduce setup duplication between [ci.yml](/Users/meik/git/tomatenstaude/.github/workflows/ci.yml) and [accessibility.yml](/Users/meik/git/tomatenstaude/.github/workflows/accessibility.yml)
