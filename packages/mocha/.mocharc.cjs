const { createRequire } = require("node:module");

const requireShared = createRequire(__filename);
const { buildEnvironmentInfo } = requireShared("@allure-tests/shared");

module.exports = {
  require: ["./hooks/globals.mjs"],
  spec: ["suites/**/*.spec.mjs"],
  retries: 2,
  timeout: 30_000,
  reporter: "allure-mocha",
  reporterOptions: {
    resultsDir: process.env.ALLURE_RESULTS_DIR ?? "allure-results",
    environmentInfo: buildEnvironmentInfo("mocha"),
  },
};
