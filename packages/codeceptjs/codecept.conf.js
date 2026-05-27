const path = require("node:path");
const os = require("node:os");
const { setCommonPlugins } = require("@codeceptjs/configure");

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
      environmentInfo: {
        framework: "codeceptjs",
        node_version: process.version,
        os_platform: os.platform(),
      },
    },
  },
  name: "allure-codeceptjs-demo",
};
