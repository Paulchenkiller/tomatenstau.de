module.exports = {
  // WCAG 2.1 AA Configuration for axe-core
  rules: {
    // Color contrast rules (WCAG 2.1 AA requires 4.5:1 for normal text, 3:1 for large text)
    'color-contrast': { enabled: true },
    'color-contrast-enhanced': { enabled: false }, // This is AAA level

    // Keyboard navigation
    'keyboard-navigation': { enabled: true },
    'focus-order-semantics': { enabled: true },
    tabindex: { enabled: true },

    // Focus management
    'focus-trap': { enabled: true },
    'focus-management': { enabled: true },

    // Images and media
    'image-alt': { enabled: true },
    'image-redundant-alt': { enabled: true },

    // Forms
    label: { enabled: true },
    'form-field-multiple-labels': { enabled: true },

    // Headings and structure
    'heading-order': { enabled: true },
    'empty-heading': { enabled: true },

    // Links
    'link-name': { enabled: true },
    'link-in-text-block': { enabled: true },

    // ARIA
    'aria-valid-attr': { enabled: true },
    'aria-valid-attr-value': { enabled: true },
    'aria-roles': { enabled: true },
    'aria-required-attr': { enabled: true },

    // Language
    'html-has-lang': { enabled: true },
    'html-lang-valid': { enabled: true },
    'valid-lang': { enabled: true },

    // Page structure
    'page-has-heading-one': { enabled: true },
    region: { enabled: true },
    'landmark-one-main': { enabled: true },

    // Tables
    'table-header': { enabled: true },
    'td-headers-attr': { enabled: true },

    // Specific to web apps
    bypass: { enabled: true }, // Skip links
  },

  // Tags to run (WCAG 2.1 AA compliance)
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],

  // Exclude certain elements if needed
  exclude: [
    // Add selectors here if needed to exclude from testing
    // Example: '#third-party-widget'
  ],

  // Include specific elements only
  include: [
    // Default to entire document
    'html',
  ],

  // Disable rules that might not be relevant
  disableRules: [
    // Add rule IDs here to disable specific rules
    // Example: 'color-contrast' if you need to temporarily disable
  ],

  // Set result types to include
  resultTypes: ['violations', 'incomplete', 'inapplicable', 'passes'],

  // Reporter configuration
  reporter: 'v2',

  // Output format
  outputFile: 'accessibility-report.json',

  // Browser configuration for CLI
  browser: 'chrome',

  // Viewport settings
  viewport: {
    width: 1280,
    height: 1024,
  },

  // Wait time for page to load
  wait: 3000,

  // Custom rules (if any)
  customRules: [
    // Add custom accessibility rules here if needed
  ],
};
