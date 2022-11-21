
module.exports = {
  transform: {
    '^.+\\.(tsx?|jsx?)$': `<rootDir>/jest/jest-preprocess.js`,
    "\\.(gql|graphql)$": "@graphql-tools/jest-transform"
  },
  moduleNameMapper: {
    ".+\\.(scss|css)$": `identity-obj-proxy`,
    '^src/(.*)$': '<rootDir>/src/$1',
    '^gatsby/(.*)$': '<rootDir>/gatsby/$1',
    "^gatsby-page-utils/(.*)$": `gatsby-page-utils/$1`, // Workaround for https://github.com/facebook/jest/issues/9771
    "^nanoid(/(.*)|$)": "nanoid$1", //https://github.com/ai/nanoid/issues/363#issuecomment-1140906651
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  globalSetup: `<rootDir>/jest/globalSetup.js`,
  setupFiles: [
    `<rootDir>/jest/setupFiles.js`,
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/setupFilesAfterEnv.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: "http://localhost/"
  }
}
