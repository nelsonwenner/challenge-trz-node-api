module.exports = {
  rootDir: '.',
  displayName: 'root-tests',
  collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  bail: 1,
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};