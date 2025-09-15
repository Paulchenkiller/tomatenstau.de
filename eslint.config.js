// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-plugin-prettier');

// Flattened flat-config: avoid nested "extends"; compose arrays directly
module.exports = tseslint.config(
  // Ignore problematic or non-source files
  {
    ignores: [
      'src/jest.setup.ts', // test setup (causes parser/rule crashes in some environments)
    ],
  },
  // Base recommended configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...angular.configs.tsRecommended,
  // Our TypeScript rules (also process inline templates)
  {
    files: ['**/*.ts'],
    plugins: { prettier },
    processor: angular.processInlineTemplates,
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
      'no-undefined': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'func-names': 'error',
      'id-length': 'error',
      'newline-before-return': 'error',
      'space-before-blocks': 'error',
      'no-alert': 'error',
      // Prettier as ESLint rule
      ...prettier.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  // Angular template (HTML) rules
  ...angular.configs.templateRecommended,
  ...angular.configs.templateAccessibility,
  {
    files: ['**/*.html'],
    rules: {},
  },
);
