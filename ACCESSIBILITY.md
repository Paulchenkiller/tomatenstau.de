# Accessibility Compliance Statement

This website is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

## Conformance Status

This website aims to conform with **WCAG 2.1 AA** standards as required by the **European Accessibility Act (EAA)**, which comes into effect in June 2025.

### Current Compliance Level

- **WCAG 2.1 Level A**: Fully compliant
- **WCAG 2.1 Level AA**: In progress (target: 100% compliance by June 2025)

## Accessibility Features

### Navigation and Structure

- ✅ Skip links for keyboard navigation
- ✅ Consistent navigation structure across all pages
- ✅ Proper heading hierarchy (H1-H6)
- ✅ Breadcrumb navigation with ARIA labels
- ✅ Keyboard-only navigation support

### Visual Design

- ✅ High contrast mode support
- ✅ Color contrast ratios meeting WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- ✅ Text can be resized up to 200% without loss of functionality
- ✅ No content relies solely on color to convey information

### Content and Language

- ✅ Alternative text for all meaningful images
- ✅ Multiple language support (German/English) with proper lang attributes
- ✅ Clear and simple language where possible
- ✅ Consistent terminology throughout the site

### Forms and Interactive Elements

- ✅ All form controls have associated labels
- ✅ Error messages are clearly identified and associated with form fields
- ✅ Focus indicators are visible for all interactive elements
- ✅ Button purposes are clearly indicated

### Code Examples and Technical Content

- ✅ Code syntax highlighting maintains adequate contrast
- ✅ Copy buttons have descriptive aria-labels
- ✅ Code examples are properly structured with semantic markup

## Testing and Validation

### Automated Testing

We use the following tools for accessibility testing:

- **axe-core**: Automated WCAG 2.1 AA compliance testing
- **Playwright with axe**: End-to-end accessibility testing
- **Jest with jest-axe**: Unit-level accessibility testing

### Manual Testing

- Keyboard navigation testing
- Screen reader testing (NVDA, JAWS, VoiceOver)
- High contrast mode validation
- Mobile accessibility testing

### Continuous Integration

All accessibility tests run automatically on:

- Every pull request
- Every deployment to production
- Weekly scheduled audits

## Running Accessibility Tests

### For Developers

```bash
# Run all accessibility tests
npm run a11y:test

# Run axe-core audit (requires server running)
npm run a11y:audit

# Run accessibility tests in CI mode
npm run a11y:ci
```

### Test Configuration

Accessibility tests are configured in:

- `axe.config.js` - Main axe-core configuration
- `e2e/accessibility.spec.ts` - End-to-end accessibility tests
- `src/app/accessibility.spec.ts` - Unit accessibility tests

## Known Issues and Roadmap

### Current Issues

- [ ] Some third-party components may not fully comply with WCAG 2.1 AA
- [ ] Advanced code execution features need accessibility enhancements

### Upcoming Improvements (by June 2025)

- [ ] Enhanced screen reader support for dynamic content
- [ ] Voice navigation compatibility
- [ ] Advanced keyboard shortcuts for power users
- [ ] Improved mobile accessibility features

## Feedback and Support

If you experience any accessibility barriers or have suggestions for improvement:

### Contact Information

- **Email**: [accessibility@tomatenstau.de](mailto:accessibility@tomatenstau.de)
- **GitHub Issues**: [Report accessibility issues](https://github.com/username/tomatenstau.de/issues/new?labels=accessibility&template=accessibility-issue.md)

### Response Time

We aim to respond to accessibility feedback within:

- **Critical issues**: 1 business day
- **Non-critical issues**: 5 business days

## Legal Compliance

### European Accessibility Act (EAA)

This website is prepared to comply with the European Accessibility Act, which requires:

- WCAG 2.1 Level AA conformance
- Accessibility statement (this document)
- Feedback mechanism for users
- Regular monitoring and reporting

### Web Content Accessibility Guidelines (WCAG) 2.1

We follow the WCAG 2.1 guidelines based on four main principles:

1. **Perceivable** - Information must be presentable in ways users can perceive
2. **Operable** - Interface components must be operable by all users
3. **Understandable** - Information and UI operation must be understandable
4. **Robust** - Content must be robust enough for various assistive technologies

## Technical Implementation

### Accessibility Technologies Used

- **ARIA (Accessible Rich Internet Applications)** for dynamic content
- **Semantic HTML5** elements for proper structure
- **CSS** for visual accessibility features
- **Angular CDK a11y module** for focus management

### Browser and Assistive Technology Support

Tested and supported with:

- **Screen Readers**: NVDA, JAWS, VoiceOver, TalkBack
- **Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Operating Systems**: Windows, macOS, iOS, Android

---

**Last Updated**: September 2025
**Next Review**: December 2025
**Standard**: WCAG 2.1 AA
**Compliance Target**: June 2025 (EAA Deadline)
