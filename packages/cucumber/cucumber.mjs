const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

export default {
  paths: ["features/**/*.feature"],
  import: ["steps/**/*.mjs"],
  retry: 2,
  format: ["progress", "allure-cucumberjs/reporter"],
  formatOptions: {
    resultsDir,
  },
};
