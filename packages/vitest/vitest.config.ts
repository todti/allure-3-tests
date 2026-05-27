import { defineConfig } from "vitest/config";
import { buildEnvironmentInfo } from "@allure-tests/shared";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

export default defineConfig({
  test: {
    include: ["suites/**/*.spec.ts"],
    globalSetup: ["./global-setup.ts"],
    setupFiles: ["./vitest.setup.ts"],
    reporters: [
      "default",
      [
        "allure-vitest/reporter",
        {
          resultsDir,
          environmentInfo: buildEnvironmentInfo("vitest"),
        },
      ],
    ],
  },
});
