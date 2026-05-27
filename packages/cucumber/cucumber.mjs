import { buildEnvironmentInfo } from "@allure-tests/shared";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

export default {
  paths: ["features/**/*.feature"],
  import: ["steps/**/*.mjs"],
  format: ["progress", "allure-cucumberjs/reporter"],
  formatOptions: {
    resultsDir,
    environmentInfo: buildEnvironmentInfo("cucumber"),
  },
};
