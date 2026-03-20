# tomatenstau.de

Personal portfolio and coding showcase site built with Angular SSR.

[![Build and Deploy](https://github.com/Paulchenkiller/tomatenstau.de/actions/workflows/main.yml/badge.svg)](https://github.com/Paulchenkiller/tomatenstau.de/actions/workflows/main.yml)
[![CI](https://github.com/Paulchenkiller/tomatenstau.de/actions/workflows/ci.yml/badge.svg)](https://github.com/Paulchenkiller/tomatenstau.de/actions/workflows/ci.yml)

## Overview

The application renders a personal homepage plus tutorial and example pages for multiple programming languages. It currently uses:

- Angular 21 standalone components
- SSR/prerender support via `@angular/ssr`
- `ngx-translate` for German and English
- `ngx-highlightjs` for code examples
- Jest for unit tests
- Playwright for E2E and accessibility checks

Implemented features in the current codebase:

- language switching with query-param, localStorage, and cookie persistence
- route-driven SEO metadata and JSON-LD generation
- high-contrast mode toggle
- skip links and keyboard-accessible navigation
- SSR build and prerender configuration

## Requirements

- Node.js 20 LTS is the safest target for local work and CI
- npm

The project may install on newer odd-numbered Node releases, but Angular warns against using them for production work.

## Branch and Deploy Notes

- `main` is the canonical branch for CI, accessibility checks, and deployment.
- The current GitHub Pages deploy workflow still depends on the repository `ACCESS_TOKEN` secret.
- CSP and HSTS are intentionally deferred at the app-server layer until the final production hosting edge is verified.

## Setup

```bash
git clone https://github.com/Paulchenkiller/tomatenstau.de.git
cd tomatenstau.de
npm install
npm start
```

Default dev server URL: `http://localhost:4200`

## Scripts

```bash
# development
npm start
npm run start:prod

# quality
npm run lint
npm run lint:eslint
npm run format
npm run format:check
npm run test:ci
npm run e2e
npm run e2e:headed

# builds
npm run build
npm run build -- --configuration=production
npm run build:ssg
npm run build:compressed
npm run build:ssg:compressed

# analysis and audits
npm run analyze
npm run lighthouse
npm run lighthouse:prod
npm run lighthouse:live
npm run a11y:test
npm run a11y:ci
npm run test:mutation

# asset utilities
npm run optimize:images
npm run compress:build
```

## Testing Notes

- `npm run test:ci` is the reliable local unit-test entry point.
- `npm test` uses `ng test`, which is separate from the Jest-based CI path and is not the preferred verification command in this repo.
- `npm run e2e` starts its own Angular dev server through Playwright.
- `npm run a11y:ci` now reuses the Playwright-based accessibility suite instead of a separate ChromeDriver-based CLI audit path.

## External Verification

These checks are the main verification commands for the current branch:

```bash
# install on the normal path
npm ci

# production build diagnostics
npm run build -- --configuration=production --verbose

# Playwright and accessibility runtime
npx playwright install chromium
npm run e2e
npm run a11y:test
npm run a11y:ci
```

Notes:

- Node 20 LTS remains the recommended local and CI runtime.
- `npm ci`, `npm run lint`, `npm run test:ci`, `npm run build -- --configuration=production --verbose`, `npx playwright install chromium`, `npm run e2e`, `npm run a11y:test`, and `npm run a11y:ci` are all confirmed on the current branch.
- `npm run a11y:ci` now uses the Playwright-based accessibility suite instead of a separate ChromeDriver-dependent CLI path.

## Project Layout

```text
src/
  app/
    code/               Tutorial and example pages
    header/             Header and language/accessibility controls
    footer/             Footer
    routing/            Route metadata helpers
    services/           Shared Angular services
  assets/
    i18n/               Translation files
    images/             Published image assets
  server.ts             Express SSR host
```

## Accessibility

Accessibility-related implementation and process notes are documented in [ACCESSIBILITY.md](ACCESSIBILITY.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), and [SECURITY.md](SECURITY.md).

## License

MIT. See [LICENSE](LICENSE).
