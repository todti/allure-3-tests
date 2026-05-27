import AllureJasmineReporter from "allure-jasmine";
import * as os from "node:os";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

jasmine.getEnv().addReporter(
  new AllureJasmineReporter({
    resultsDir,
    environmentInfo: {
      framework: "jasmine",
      node_version: process.version,
      os_platform: os.platform(),
    },
  }),
);
