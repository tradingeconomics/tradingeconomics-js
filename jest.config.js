module.exports = {
  coverageDirectory: "tests/coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/Examples/"],

  // in order to make sure we are always testing the local version of the lib
  moduleNameMapper: {
    "^tradingeconomics$": "<rootDir>/tradingeconomics",
  },
  // increase timeout to allow for API requests
  testTimeout: 200000,
};
