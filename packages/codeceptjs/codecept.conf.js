const path = require("node:path");
const { createRequire } = require("node:module");
const { setCommonPlugins } = require("@codeceptjs/configure");

const requireShared = createRequire(__filename);
const { buildEnvironmentInfo } = requireShared("@allure-tests/shared");

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

setCommonPlugins();

/** @type {import('codeceptjs').Config} */
exports.config = {
  tests: "./suites/**/*_test.ts",
  output: "./output",
  helpers: {
    Playwright: {
      url: "https://playwright.dev",
      show: false,
      browser: "chromium",
      headless: true,
    },
  },
  include: {
    I: "./steps_file.js",
  },
  plugins: {
    allure: {
      enabled: true,
      require: "allure-codeceptjs",
      resultsDir: path.resolve(resultsDir),
      environmentInfo: buildEnvironmentInfo("codeceptjs"),
    },
  },
  name: "allure-codeceptjs-demo",
  async bootstrap() {
    const { runGlobalSetup } = await import("@allure-tests/shared");
    await runGlobalSetup({ framework: "codeceptjs", runner: "node" });
  },
  async teardown() {
    const { runGlobalTeardown } = await import("@allure-tests/shared");
    await runGlobalTeardown({ framework: "codeceptjs", runner: "node" });
  },
};
