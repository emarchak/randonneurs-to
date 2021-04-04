
module.exports = {
  transform: {
    '^.+\\.(tsx?|jsx?)$': `<rootDir>/jest/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(scss|css)$": `identity-obj-proxy`,
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  testURL: `http://localhost`,
  globalSetup: `<rootDir>/jest/globalSetup.js`,
  setupFiles: [
    `<rootDir>/jest/setupFiles.js`,
    'jest-date-mock'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/setupFilesAfterEnv.js'],
}
