import * as os from "node:os";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

export const config: WebdriverIO.Config = {
  runner: "local",
  specs: ["./suites/**/*.spec.ts"],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["headless", "no-sandbox", "disable-gpu", "window-size=1280,720"],
      },
    },
  ],
  logLevel: "error",
  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: resultsDir,
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
        reportedEnvironmentVars: {
          framework: "webdriverio",
          node_version: process.version,
          os_platform: os.platform(),
        },
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 60_000,
    retries: 2,
  },
};
