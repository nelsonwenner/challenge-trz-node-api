module.exports = {
  rootDir: '.',
  displayName: 'root-tests',
  collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};