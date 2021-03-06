const path = require("path")

module.exports = {
  transform: {
    "^.+\\.(tsx?|jsx?)$": `<rootDir>/jest/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(scss|css)$": `identity-obj-proxy`,
    "^@reach/router(.*)": "<rootDir>/node_modules/@gatsbyjs/reach-router$1",
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  collectCoverage: true,
  coverageReporters: ["lcov", "text"],
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/jest/loadershim.js`],
  setupFilesAfterEnv: ["<rootDir>/jest/setup-test-env.js"],
}
