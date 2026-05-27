import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";
import { buildEnvironmentInfo, runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

export default defineConfig({
  e2e: {
    baseUrl: "https://playwright.dev",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    retries: { runMode: 2, openMode: 0 },
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: path.resolve(__dirname, resultsDir),
        environmentInfo: buildEnvironmentInfo("cypress"),
      });

      on("before:run", async () => {
        await runGlobalSetup({ framework: "cypress", runner: "node" });
      });

      on("after:run", async () => {
        await runGlobalTeardown({ framework: "cypress", runner: "node" });
      });

      return config;
    },
  },
  video: false,
  screenshotOnRunFailure: true,
});
