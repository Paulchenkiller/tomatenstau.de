/**
 * Custom Jest configuration for Angular project using @angular-builders/jest.
 * We keep it minimal and only add a global setup file.
 */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  // Ignore Playwright E2E specs and artifacts so Jest only runs unit tests
  testPathIgnorePatterns: [
    '<rootDir>/e2e/',
    '<rootDir>/playwright-report/',
    '<rootDir>/test-results/',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/app/breadcrumb/**/*.ts',
    'src/app/header/**/*.ts',
    'src/app/app.component.ts',
    'src/app/page-not-found/**/*.ts',
  ],
  coverageReporters: ['text', 'text-summary', 'lcov'],
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
    global: {
      statements: 71,
      branches: 61,
      functions: 65,
      lines: 72,
    },
  },
};
