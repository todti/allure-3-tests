import { buildEnvironmentInfo } from "@allure-tests/shared";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

/** @type {import('jest').Config} */
export default {
  testEnvironment: "allure-jest/node",
  testMatch: ["<rootDir>/suites/**/*.spec.mjs"],
  globalSetup: "<rootDir>/global-setup.mjs",
  globalTeardown: "<rootDir>/global-teardown.mjs",
  testEnvironmentOptions: {
    resultsDir,
    environmentInfo: buildEnvironmentInfo("jest"),
  },
};
