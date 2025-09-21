# tomatenstau.de

> Personal portfolio and coding showcase website featuring programming tutorials, examples, and technical insights.

[![Build and Deploy](https://github.com/Paulchenkiller/tomatenstau.de/actions/workflows/main.yml/badge.svg)](https://github.com/Paulchenkiller/tomatenstau.de/actions/workflows/main.yml)
[![CI](https://github.com/Paulchenkiller/tomatenstau.de/actions/workflows/ci.yml/badge.svg)](https://github.com/Paulchenkiller/tomatenstau.de/actions/workflows/ci.yml)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1-AA%20Compliant-green)](https://www.w3.org/WAI/WCAG21/quickref/)

## 🌟 About

**tomatenstau.de** is a modern, accessible web application showcasing programming concepts, tutorials, and code examples across multiple languages. Built with Angular and designed with performance and accessibility in mind.

### ✨ Features

- 🌐 **Multilingual Support** (German/English) with ngx-translate
- ♿ **WCAG 2.1 AA Compliant** - Full accessibility support
- 🚀 **High Performance** - Optimized bundles and lazy loading
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Dark Mode Support** - System preference aware
- 🔍 **SEO Optimized** - Server-side rendering with structured data
- 💻 **Code Highlighting** - Syntax highlighting for multiple languages
- 🧪 **Comprehensive Testing** - Unit, E2E, and accessibility tests

### 🛠 Tech Stack

- **Framework**: Angular 19 with standalone components
- **Language**: TypeScript (strict mode)
- **Styling**: SCSS with modular architecture
- **Internationalization**: ngx-translate
- **Testing**: Jest (unit), Playwright (E2E), axe-core (a11y)
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks
- **Deployment**: GitHub Actions with automated builds
- **Hosting**: GitHub Pages with custom domain

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Paulchenkiller/tomatenstau.de.git
cd tomatenstau.de

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:4200` to see the application.

### Available Scripts

```bash
# Development
npm start              # Start dev server with hot reload
npm run dev           # Alias for npm start

# Building
npm run build         # Production build with SSR
npm run build:dev     # Development build

# Testing
npm test              # Run unit tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
npm run e2e           # Run E2E tests
npm run e2e:ui        # Run E2E tests with UI

# Code Quality
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm run format        # Format code with Prettier
npm run format:check  # Check Prettier formatting

# Accessibility
npm run a11y:audit    # Run accessibility audit

# Performance
npm run lighthouse    # Run Lighthouse audit
```

## 🏗 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   ├── code/               # Programming language sections
│   │   ├── javascript/     # JavaScript tutorials
│   │   ├── python/         # Python examples
│   │   ├── haskell/        # Haskell concepts
│   │   └── ...            # Other languages
│   ├── services/          # Angular services
│   ├── types/            # TypeScript type definitions
│   └── app.config.ts     # Application configuration
├── assets/
│   ├── i18n/             # Translation files
│   ├── images/           # Optimized images
│   └── styles/           # Global styles
└── environments/         # Environment configs
```

## 🌍 Internationalization

The application supports German and English with automatic language detection:

- **Browser preference** detection on first visit
- **URL parameter** support (`?lang=en` or `?lang=de`)
- **localStorage** persistence for user preference
- **Cookie fallback** for environments that reset localStorage

### Adding Translations

1. Add new keys to `src/assets/i18n/en.json` and `src/assets/i18n/de.json`
2. Use in templates: `{{ 'YOUR.KEY' | translate }}`
3. Use in components: `this.translate.get('YOUR.KEY')`

## ♿ Accessibility

This project is committed to WCAG 2.1 AA compliance:

- ✅ **Semantic HTML** with proper ARIA labels
- ✅ **Keyboard navigation** support
- ✅ **Screen reader** compatibility
- ✅ **Color contrast** minimum 4.5:1 ratio
- ✅ **Focus management** and skip links
- ✅ **High contrast mode** support

Run accessibility audits:

```bash
npm run a11y:audit      # Automated audit with axe-core
npm run lighthouse      # Full Lighthouse audit including a11y
```

## 🚢 Deployment

The application is automatically deployed via GitHub Actions:

1. **Push to master** triggers the build pipeline
2. **Build process** includes linting, testing, and building
3. **Accessibility audit** ensures WCAG compliance
4. **Deploy to GitHub Pages** with custom domain

### Manual Deployment

```bash
npm run build           # Build for production
# Deploy dist/tomatenstaude/browser to your hosting provider
```

## 🧪 Testing

### Unit Tests (Jest)

```bash
npm test                # Single run
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
```

Current coverage: **96.86% statements** (target: ≥80% for core components)

### E2E Tests (Playwright)

```bash
npm run e2e            # Headless mode
npm run e2e:ui         # With browser UI
```

### Accessibility Testing

Automated accessibility testing is integrated into the CI pipeline using axe-core.

## 🎨 Code Style

- **ESLint** for TypeScript/Angular best practices
- **Prettier** for consistent code formatting
- **Conventional Commits** for semantic commit messages
- **Husky** pre-commit hooks for quality assurance

### Commit Convention

```
type(scope): description

Examples:
feat(i18n): add French translation support
fix(a11y): improve keyboard navigation
docs: update README setup instructions
```

## 📈 Performance

- **Bundle size**: ~138KB compressed (target: <200KB)
- **Lighthouse score**: 79/100 (target: 80+)
- **Core Web Vitals**: Optimized for LCP, CLS, FID
- **Image optimization**: WebP format with Sharp processing
- **Tree-shaking**: Only 8 FontAwesome icons loaded (from 5000+)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our code style
4. Run tests (`npm test`)
5. Commit using conventional commits
6. Push to your branch
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security concerns, please see our [Security Policy](SECURITY.md).

## 📞 Contact

**Meik Geldmacher**

- Website: [tomatenstau.de](https://tomatenstau.de)
- GitHub: [@Paulchenkiller](https://github.com/Paulchenkiller)
- LinkedIn: [meik-geldmacher](https://www.linkedin.com/in/meik-geldmacher)

## 🙏 Acknowledgments

- [Angular](https://angular.io) - The web framework
- [ngx-translate](https://github.com/ngx-translate/core) - Internationalization
- [Highlight.js](https://highlightjs.org) - Syntax highlighting
- [Jest](https://jestjs.io) - Testing framework
- [Playwright](https://playwright.dev) - E2E testing
- [axe-core](https://github.com/dequelabs/axe-core) - Accessibility testing
