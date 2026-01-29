// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    ignores: ['src/jest.setup.ts', 'dist/**/*', 'node_modules/**/*'],
  },

  // Base configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // TypeScript files configuration
  {
    files: ['**/*.ts'],
    extends: [...angular.configs.tsRecommended],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/adjacent-overload-signatures': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      '@angular-eslint/prefer-inject': 'off',
      'no-empty': 'off',
    },
  },

  // Angular template configuration - separate from TypeScript files
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
    rules: {
      // Template-specific rules
    },
  },
);
