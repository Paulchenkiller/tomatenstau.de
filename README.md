# tomatenstau.de

Personal landing page for [Meik Geldmacher](https://tomatenstau.de), built with [Astro](https://astro.build).

## Tech stack

- [Astro 5](https://astro.build) — static site generator, zero JS shipped by default
- TypeScript (strict)
- Plain CSS with custom properties (dark theme, high-contrast mode)
- [Playwright](https://playwright.dev) + [axe-core](https://github.com/dequelabs/axe-core) — WCAG 2.1 AA accessibility testing
- [GitHub Pages](https://pages.github.com) — hosting via `peaceiris/actions-gh-pages`
- [Husky](https://typicode.github.io/husky) — pre-commit hooks (formatting + type check)
- [commitlint](https://commitlint.js.org) — Conventional Commits enforcement

## Development

```bash
npm install
npm run dev          # start dev server at localhost:4321
npm run build        # build static site to dist/
npm run preview      # preview built site locally
npm run check        # Astro + TypeScript type check
npm run format       # auto-format all files with Prettier
npm run format:check # check formatting without writing
npm run lint         # type check + format check combined
npm test             # run Playwright e2e + accessibility tests
```

## Project structure

```
src/
├── layouts/BaseLayout.astro   # HTML shell, fonts, HC init script, skip link
├── components/
│   ├── Header.astro           # Logo, social icons, lang switcher, HC toggle
│   └── Footer.astro           # Social icons, copyright
├── pages/
│   ├── index.astro            # EN home (+ DE redirect script)
│   ├── de/index.astro         # DE home
│   └── 404.astro
├── i18n/
│   ├── en.ts                  # English strings (source of truth for types)
│   └── de.ts                  # German strings (typed against en.ts)
└── styles/global.css          # Dark theme, typography, a11y, HC overrides
public/
├── images/                    # Profile photo and logo (jpg + webp)
└── favicon/                   # Favicon set
e2e/home.spec.ts               # Playwright tests
```

## i18n

- English: `/`
- German: `/de/`

Language preference is stored in `localStorage` and a cookie. Visitors with a German browser locale are automatically redirected to `/de/` before first paint (no server required).

## High-contrast mode

The HC toggle button in the header sets `data-theme="hc"` on `<html>`. The preference is persisted via `localStorage` and a cookie. An inline `<script>` in `<head>` reads the preference before first paint to avoid a flash.

## CI / Deploy

| Workflow   | Trigger          | What it does                                           |
| ---------- | ---------------- | ------------------------------------------------------ |
| `ci.yml`   | every push / PR  | commitlint · prettier · `astro check` · Playwright e2e |
| `main.yml` | push to `master` | build → deploy to GitHub Pages (`gh-pages` branch)     |
