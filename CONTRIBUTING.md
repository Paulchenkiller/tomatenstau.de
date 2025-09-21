# Contributing to tomatenstau.de

Thank you for considering contributing to tomatenstau.de! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Basic knowledge of Angular and TypeScript

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/tomatenstau.de.git
   cd tomatenstau.de
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open `http://localhost:4200` in your browser

## 📝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs. actual behavior
- Browser/OS information
- Screenshots if applicable

### Suggesting Enhancements

We welcome suggestions for new features or improvements:

- Check existing issues first to avoid duplicates
- Provide clear description and rationale
- Consider accessibility and performance implications

### Code Contributions

#### Before You Start

1. Check existing issues and PRs to avoid duplicates
2. For significant changes, open an issue first to discuss
3. Ensure your changes align with the project's goals

#### Development Workflow

1. Create a feature branch from `master`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards

3. Test your changes:

   ```bash
   npm test                 # Unit tests
   npm run e2e             # E2E tests
   npm run a11y:audit      # Accessibility tests
   npm run lint            # Code quality
   ```

4. Commit your changes using conventional commits:

   ```bash
   git commit -m "feat: add new feature description"
   ```

5. Push to your fork and submit a pull request

## 🎨 Code Style Guidelines

### TypeScript/Angular

- Use TypeScript strict mode
- Follow Angular style guide
- Use standalone components where possible
- Implement proper error handling
- Add JSDoc comments for public APIs

### Accessibility

- Ensure WCAG 2.1 AA compliance
- Use semantic HTML elements
- Provide proper ARIA labels
- Test with keyboard navigation
- Verify screen reader compatibility

### Testing

- Write unit tests for new features
- Maintain test coverage ≥80% for core components
- Include E2E tests for user workflows
- Test accessibility with axe-core

### Internationalization

- Add translations for both German and English
- Use meaningful translation keys
- Test language switching functionality

## 📋 Commit Convention

We use [Conventional Commits](https://conventionalcommits.org/) for semantic commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons)
- `refactor`: Code refactoring without functionality changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependencies updates

### Examples

```bash
feat(i18n): add French translation support
fix(a11y): improve keyboard navigation in header
docs: update contributing guidelines
style: format code with prettier
refactor(components): extract shared button component
perf(images): optimize WebP compression
test(utils): add unit tests for date formatter
chore(deps): update Angular to v19
```

## 🔍 Pull Request Process

1. **Before submitting:**
   - Ensure all tests pass
   - Run linting and formatting
   - Update documentation if needed
   - Add/update tests for new functionality

2. **PR Description:**
   - Clear title following conventional commits
   - Describe what changes were made and why
   - Link related issues
   - Include screenshots for UI changes

3. **Review Process:**
   - All PRs require review before merging
   - Address feedback promptly
   - Keep discussions respectful and constructive

4. **Merging:**
   - PRs are merged using squash and merge
   - Commit message will follow conventional commits
   - Delete feature branch after merge

## 🌍 Internationalization Guidelines

### Adding New Translations

1. Add keys to both `src/assets/i18n/en.json` and `src/assets/i18n/de.json`
2. Use nested keys for organization:
   ```json
   {
     "HEADER": {
       "NAVIGATION": {
         "HOME": "Home"
       }
     }
   }
   ```
3. Use descriptive key names that indicate context
4. Avoid hardcoded text in components

### Translation Best Practices

- Keep translations concise and clear
- Consider cultural differences
- Use consistent terminology
- Test both languages thoroughly

## ♿ Accessibility Guidelines

We are committed to WCAG 2.1 AA compliance:

### Requirements

- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Screen Readers**: Provide proper ARIA labels and semantic markup
- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Focus Management**: Visible focus indicators and logical tab order
- **Alternative Text**: Descriptive alt text for images

### Testing

- Use automated tools: `npm run a11y:audit`
- Test with keyboard navigation only
- Verify with screen readers (NVDA, JAWS, VoiceOver)
- Check color contrast ratios

## 🚦 Performance Guidelines

### Code Splitting

- Use lazy loading for routes
- Load dependencies only when needed
- Optimize bundle sizes

### Images

- Use WebP format with fallbacks
- Implement responsive images
- Optimize file sizes

### Best Practices

- Use OnPush change detection strategy
- Avoid memory leaks (unsubscribe from observables)
- Minimize DOM manipulations
- Use Angular's built-in performance features

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Follow the project's goals and vision

## ❓ Questions?

- Open an issue for questions about the codebase
- Check existing documentation first
- Be specific about what you need help with

## 🙏 Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes for significant contributions
- README acknowledgments section

Thank you for contributing to tomatenstau.de! 🍅
