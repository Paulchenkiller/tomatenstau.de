/**
 * Custom Jest configuration for Angular project using @angular-builders/jest.
 * We keep it minimal and only add a global setup file.
 */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
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
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80,
    },
  },
};
