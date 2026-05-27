import { buildEnvironmentInfo, runGlobalSetupFiles, runGlobalTeardownFiles } from "@allure-tests/shared";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

export const config: WebdriverIO.Config = {
  runner: "local",
  specs: ["./suites/**/*.spec.ts"],
  maxInstances: 1,
  onPrepare: async () => {
    runGlobalSetupFiles({ framework: "webdriverio" });
  },
  onComplete: async () => {
    runGlobalTeardownFiles({ framework: "webdriverio" });
  },
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
        reportedEnvironmentVars: buildEnvironmentInfo("webdriverio"),
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 60_000,
    retries: 2,
  },
};
