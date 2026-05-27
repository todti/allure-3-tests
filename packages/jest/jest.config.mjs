import * as os from "node:os";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

/** @type {import('jest').Config} */
export default {
  testEnvironment: "allure-jest/node",
  testMatch: ["<rootDir>/suites/**/*.spec.mjs"],
  testEnvironmentOptions: {
    resultsDir,
    environmentInfo: {
      framework: "jest",
      node_version: process.version,
      os_platform: os.platform(),
    },
  },
};
