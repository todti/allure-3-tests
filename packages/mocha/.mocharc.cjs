module.exports = {
  require: ["./hooks/globals.mjs"],
  spec: ["suites/**/*.spec.mjs"],
  retries: 2,
  timeout: 30_000,
  reporter: "allure-mocha",
  reporterOptions: {
    resultsDir: process.env.ALLURE_RESULTS_DIR ?? "allure-results",
  },
};
