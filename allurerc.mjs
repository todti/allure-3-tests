import { defineConfig } from "allure";

const FRAMEWORKS = [
  "playwright",
  "mocha",
  "cucumber",
  "webdriverio",
  "vitest",
  "jest",
  "jasmine",
  "cypress",
  "codeceptjs",
  "newman",
  "bun",
];

/** @type {import("allure").AllureConfig} */
const config = {
  name: "Allure 3 multi-framework demo",
  output: "./allure-report",
  historyPath: "./history.jsonl",
  plugins: {
    awesomeAll: {
      import: "@allurereport/plugin-awesome",
      options: {
        reportName: "All tests",
        singleFile: false,
        reportLanguage: "en",
        open: false,
        publish: true,
      },
    },
    dashboard: {
      options: {
        reportName: "Dashboard",
        singleFile: false,
        reportLanguage: "en",
        publish: true,
      },
    },
    ...Object.fromEntries(
      FRAMEWORKS.map((framework) => [
        `awesome-${framework}`,
        {
          import: "@allurereport/plugin-awesome",
          options: {
            reportName: `Awesome: ${framework}`,
            singleFile: false,
            reportLanguage: "en",
            open: false,
            publish: true,
            filter: ({ labels }) =>
              labels.some(({ name, value }) => name === "framework" && value === framework),
          },
        },
      ]),
    ),
  },
};

export default defineConfig(config);
