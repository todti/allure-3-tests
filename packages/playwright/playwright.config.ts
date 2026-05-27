import { defineConfig, devices } from "@playwright/test";
import * as os from "node:os";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

export default defineConfig({
  testDir: "./suites",
  reporter: [
    ["list"],
    [
      "allure-playwright",
      {
        resultsDir,
        environmentInfo: {
          framework: "playwright",
          node_version: process.version,
          os_platform: os.platform(),
          os_release: os.release(),
        },
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
