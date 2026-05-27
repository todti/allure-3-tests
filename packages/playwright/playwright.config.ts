import { defineConfig, devices } from "@playwright/test";
import { buildEnvironmentInfo } from "@allure-tests/shared";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

export default defineConfig({
  testDir: "./suites",
  timeout: 30_000,
  globalTimeout: process.env.CI ? 600_000 : undefined,
  retries: process.env.CI ? 2 : 1,
  globalSetup: "./global-setup.ts",
  globalTeardown: "./global-teardown.ts",
  reporter: [
    ["list"],
    [
      "allure-playwright",
      {
        resultsDir,
        environmentInfo: buildEnvironmentInfo("playwright"),
      },
    ],
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
