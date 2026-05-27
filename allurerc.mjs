import { defineConfig } from "allure";
import { FRAMEWORK_REPORT_NAMES } from "@allure-tests/shared";

const FRAMEWORKS = Object.keys(FRAMEWORK_REPORT_NAMES);

const frameworkLabel = (framework) => (tr) =>
  tr.labels.some(
    ({ name, value }) => name === "framework" && (value === framework || value === `${framework}js`),
  );

/** @type {import("allure").AllureConfig} */
const config = {
  name: "Allure 3 · All Frameworks",
  output: "./allure-report",
  historyPath: "./history.jsonl",
  globalAttachments: ["./allure-global/**", "./packages/*/allure-global/**"],
  qualityGate: {
    rules: [
      {
        id: "global-gate",
        maxFailures: 20,
        minTestsCount: 100,
        successRate: 0.7,
      },
      ...FRAMEWORKS.map((framework) => ({
        id: `gate-${framework}`,
        maxFailures: 2,
        minTestsCount: 12,
        successRate: 0.75,
        filter: frameworkLabel(framework),
      })),
    ],
  },
  plugins: {
    awesomeAll: {
      import: "@allurereport/plugin-awesome",
      options: {
        reportName: "Allure 3 · Combined dashboard",
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
    log: {
      options: {
        groupBy: "none",
      },
    },
    ...Object.fromEntries(
      FRAMEWORKS.map((framework) => [
        `awesome-${framework}`,
        {
          import: "@allurereport/plugin-awesome",
          options: {
            reportName: FRAMEWORK_REPORT_NAMES[framework],
            singleFile: false,
            reportLanguage: "en",
            open: false,
            publish: true,
            filter: ({ labels }) =>
              labels.some(
                ({ name, value }) =>
                  name === "framework" && (value === framework || value === `${framework}js`),
              ),
          },
        },
      ]),
    ),
  },
};

export default defineConfig(config);
