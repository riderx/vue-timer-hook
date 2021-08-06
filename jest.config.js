module.exports = {
  // only apply on test with --coverage
  collectCoverage: false,
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  testMatch: ['<rootDir>/__tests__/**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': '@sucrase/jest-plugin',
  },
  globals: {
    __DEV__: true,
    __BROWSER__: true,
    __TEST__: true,
  },
  testURL: 'http://localhost/',
}
