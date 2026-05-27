import * as os from "node:os";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

export default {
  paths: ["features/**/*.feature"],
  import: ["steps/**/*.mjs"],
  format: ["progress", "allure-cucumberjs/reporter"],
  formatOptions: {
    resultsDir,
    environmentInfo: {
      framework: "cucumber",
      node_version: process.version,
      os_platform: os.platform(),
    },
  },
};
