# tomatenstau.de

Personal landing page for [Meik Geldmacher](https://tomatenstau.de), built with [Astro](https://astro.build).

## Tech stack

- [Astro 6](https://astro.build) — static site generator, zero JS by default
- TypeScript (strict)
- Plain CSS with custom properties
- [Playwright](https://playwright.dev) + [axe-core](https://github.com/dequelabs/axe-core) — e2e and WCAG 2.1 AA accessibility tests
- [Husky](https://typicode.github.io/husky) — pre-commit (Prettier + type check) and pre-push (full e2e suite)
- [commitlint](https://commitlint.js.org) — Conventional Commits enforcement
- [GitHub Pages](https://pages.github.com) — hosting via `peaceiris/actions-gh-pages`

## Development

Node.js >=22.12.0 required.

```bash
npm install
npm run dev          # start dev server at localhost:4321
npm run build        # build static site to dist/
npm run preview      # preview built site locally
npm run check        # Astro + TypeScript type check
npm run format       # auto-format with Prettier
npm run format:check # check formatting without writing
npm test             # run Playwright e2e tests (requires a built site)
```

## Project structure

```
src/
├── layouts/BaseLayout.astro   # HTML shell, meta tags, skip link
├── pages/
│   ├── index.astro            # Home page
│   └── 404.astro              # Custom 404 terminal page
├── i18n/en.ts                 # UI strings
└── styles/global.css          # Global styles
public/
├── images/                    # Profile photo and logo (jpg + webp)
└── favicon/                   # Favicon set
e2e/
├── home.spec.ts               # Home and 404 page tests
└── easter-egg.spec.ts         # Easter egg interaction tests
```

## CI / Deploy

| Workflow   | Trigger          | What it does                                           |
| ---------- | ---------------- | ------------------------------------------------------ |
| `ci.yml`   | every push / PR  | commitlint · Prettier · `astro check` · Playwright e2e |
| `main.yml` | push to `master` | build → deploy to GitHub Pages (`gh-pages` branch)     |
