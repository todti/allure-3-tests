import { defineConfig } from "vitest/config";
import * as os from "node:os";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

export default defineConfig({
  test: {
    include: ["suites/**/*.spec.ts"],
    setupFiles: ["./vitest.setup.ts"],
    reporters: [
      "default",
      [
        "allure-vitest/reporter",
        {
          resultsDir,
          environmentInfo: {
            framework: "vitest",
            node_version: process.version,
            os_platform: os.platform(),
          },
        },
      ],
    ],
  },
});
