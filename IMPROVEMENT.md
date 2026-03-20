# Improvement Backlog

Last updated: 2026-03-20

This file is a living backlog. Completed work should be moved into the completed section whenever changes land on the branch.

## Verification Snapshot

Current branch state verified during the latest pass:

- `npm run lint` -> passed
- `npm run test:ci` -> passed
- `npm run build -- --configuration=production` -> local process still exits abnormally in this sandbox after emitting output
- `npm run e2e` -> still blocked in this sandbox because the Angular dev server cannot bind a local port (`listen EPERM`)

## Completed On `codex-improvement-cleanup`

### Route and test drift

- removed the dead `ContactComponent` feature and its skipped spec
- removed stale `/contact` assertions from `e2e/accessibility.spec.ts`

### Route metadata consolidation

- added typed route metadata helpers in [src/app/routing/route-meta.ts](/Users/meik/git/tomatenstaude/src/app/routing/route-meta.ts)
- normalized route metadata in [src/app/app.config.ts](/Users/meik/git/tomatenstaude/src/app/app.config.ts)
- removed the hardcoded URL-to-title and URL-to-description maps from [src/app/app.component.ts](/Users/meik/git/tomatenstaude/src/app/app.component.ts)
- route-based SEO and breadcrumb JSON-LD are now derived from the active route tree

### Dead code cleanup

- removed the unused breadcrumb component and related files
- removed unused footer side-effect injection
- removed unused header state and related dead logic
- trimmed unused icon registration code

### Dependency and asset cleanup

- removed unused packages from `package.json` and `package-lock.json`:
  - `@ngx-translate/http-loader`
  - `chromedriver`
  - `jasmine-core`
  - `jasmine-spec-reporter`
  - `@fortawesome/free-regular-svg-icons`
- removed unreferenced image assets from `src/assets/images` and `src/assets/images/optimized`

### Documentation drift

- rewrote [README.md](/Users/meik/git/tomatenstaude/README.md) to match the actual scripts and current Angular version
- rewrote [ACCESSIBILITY.md](/Users/meik/git/tomatenstaude/ACCESSIBILITY.md) to match what is actually implemented and verified

### E2E baseline improvement

- switched Playwright config from `localhost` to `127.0.0.1` in [playwright.config.ts](/Users/meik/git/tomatenstaude/playwright.config.ts)

## Remaining Work

### High Priority

#### 1. Replace imperative DOM enhancement for code blocks

Status: open

Why:

- [src/app/app.component.ts](/Users/meik/git/tomatenstaude/src/app/app.component.ts) still queries `pre` elements, injects buttons, and uses timers.

Next step:

- move copy-button behavior into a directive or dedicated code-block component

#### 2. Reduce silent `catch {}` usage

Status: open

Why:

- silent catches still exist in header, app bootstrap, and meta/update paths

Next step:

- replace broad catches with narrower handling and explicit fallbacks

#### 3. Make long-lived subscriptions lifecycle-safe

Status: open

Why:

- `AppComponent` and `HeaderComponent` still subscribe directly in constructors

Next step:

- move to destroy-aware subscription handling supported by the repo setup

### Medium Priority

#### 4. Improve E2E reliability further

Status: partially done

Done:

- Playwright now uses `127.0.0.1`

Left:

- replace fixed `waitForTimeout(...)` calls with semantic waits
- tighten brittle selectors
- verify full runtime outside this sandbox

#### 5. Unskip and repair remaining skipped specs

Status: open

Still skipped:

- [src/app/code/perl/perl-index/perl-index.component.spec.ts](/Users/meik/git/tomatenstaude/src/app/code/perl/perl-index/perl-index.component.spec.ts)
- [src/app/code/python/python-index/python-index.component.spec.ts](/Users/meik/git/tomatenstaude/src/app/code/python/python-index/python-index.component.spec.ts)
- [src/app/code/prolog/prolog-index/prolog-index.component.spec.ts](/Users/meik/git/tomatenstaude/src/app/code/prolog/prolog-index/prolog-index.component.spec.ts)
- [src/app/code/prolog/prolog-ackermann/prolog-ackermann.component.spec.ts](/Users/meik/git/tomatenstaude/src/app/code/prolog/prolog-ackermann/prolog-ackermann.component.spec.ts)
- [src/app/code/prolog/prolog-hanoi/prolog-hanoi.component.spec.ts](/Users/meik/git/tomatenstaude/src/app/code/prolog/prolog-hanoi/prolog-hanoi.component.spec.ts)

Notes:

- these are still failing due to testbed/template setup issues unrelated to the main cleanup
- add a CI guard against new committed `.skip` once these are repaired

#### 6. Improve type safety

Status: partially done

Done:

- introduced typed route metadata
- removed one `any`-driven header field and related dead code

Left:

- reduce `Observable<any>` and remaining broad `any` usage
- tighten ESLint rules incrementally

#### 7. Refactor accessibility and theme styles

Status: open

Why:

- [src/styles.css](/Users/meik/git/tomatenstaude/src/styles.css) still contains many global overrides and `!important` rules

Next step:

- introduce clearer design/accessibility tokens and reduce global overrides

#### 8. Continue asset cleanup

Status: partially done

Done:

- removed clearly unreferenced image files

Left:

- decide whether source-only assets should live outside `src/assets`
- remove any remaining redundant originals once ownership is clear

#### 9. Re-test install without `legacy-peer-deps`

Status: open

Why:

- `.npmrc` still sets `legacy-peer-deps=true`

Next step:

- verify dependency installation without this escape hatch and remove it if no longer needed

### Lower Priority

#### 10. Strengthen SEO and structured data further

Status: partially done

Done:

- route-driven metadata is now centralized

Left:

- expand richer metadata for tutorial/article pages if needed
- add SSR assertions for rendered metadata

#### 11. Improve build diagnostics

Status: open

Why:

- local production build still ends abnormally in this sandbox even though output is emitted

Next step:

- verify build behavior in a normal local shell or CI runner and capture the exact failure mode

#### 12. Improve server hardening

Status: open

Why:

- [src/server.ts](/Users/meik/git/tomatenstaude/src/server.ts) still lacks explicit security header handling

Next step:

- add CSP and related headers at server or hosting/CDN level

#### 13. Normalize CI and deployment workflows

Status: open

Why:

- workflow duplication and branch strategy drift still exist

Next step:

- align deploy, CI, and accessibility workflows

## Suggested Next Slice

The next best cleanup batch is:

1. extract the copy-button enhancement out of `AppComponent`
2. remove or narrow silent catches
3. replace brittle E2E waits/selectors
4. repair and unskip the remaining five skipped specs
