
module.exports = {
  transform: {
    '^.+\\.(tsx?|jsx?)$': `<rootDir>/jest/jest-preprocess.js`,
    "\\.(gql|graphql)$": "@jagi/jest-transform-graphql"
  },
  moduleNameMapper: {
    ".+\\.(scss|css)$": `identity-obj-proxy`,
    '^src/(.*)$': '<rootDir>/src/$1',
    '^gatsby/(.*)$': '<rootDir>/gatsby/$1',
    "^gatsby-page-utils/(.*)$": `gatsby-page-utils/dist/$1`, // Workaround for https://github.com/facebook/jest/issues/9771
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
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/setupFilesAfterEnv.js'],
  testEnvironment: 'jsdom'
}
