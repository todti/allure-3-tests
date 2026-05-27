import { buildEnvironmentInfo, runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

export const config: WebdriverIO.Config = {
  runner: "local",
  specs: ["./suites/**/*.spec.ts"],
  maxInstances: 1,
  onPrepare: async () => {
    await runGlobalSetup({ framework: "webdriverio", runner: "node" });
  },
  onComplete: async () => {
    await runGlobalTeardown({ framework: "webdriverio", runner: "node" });
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
