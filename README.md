# tomatenstau.de

Personal landing page for Meik Geldmacher, built with [Astro](https://astro.build).

## Tech stack

- [Astro 5](https://astro.build) — static site generator
- TypeScript
- Playwright + axe-core for WCAG 2.1 AA accessibility testing
- GitHub Pages for hosting

## Development

```bash
npm install
npm run dev       # start dev server at localhost:4321
npm run build     # build to dist/
npm run preview   # preview built site
npm run check     # Astro type check
npm test          # run Playwright e2e tests
```

## i18n

- English: `/`
- German: `/de/`

Language preference is stored in `localStorage` and a cookie. German-locale browsers are automatically redirected to `/de/`.
