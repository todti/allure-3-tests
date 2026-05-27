import { defineConfig } from "allure";

const FRAMEWORK_REPORT_NAMES = {
  playwright: "Playwright · Browser E2E",
  mocha: "Mocha · Node.js BDD",
  cucumber: "Cucumber · Gherkin BDD",
  webdriverio: "WebdriverIO · Selenium + Mocha",
  vitest: "Vitest · Vite-native tests",
  jest: "Jest · Unit & integration",
  jasmine: "Jasmine · Behavior specs",
  cypress: "Cypress · Browser automation",
  codeceptjs: "CodeceptJS · Actor-driven BDD",
  newman: "Newman · Postman API",
  bun: "Bun · Mocha-compatible runner",
};

const HOST_NAMES = ["Linux", "macOS", "Windows"];

const FRAMEWORKS = Object.keys(FRAMEWORK_REPORT_NAMES);

const frameworkLabel = (framework) => (tr) =>
  tr.labels.some(
    ({ name, value }) => name === "framework" && (value === framework || value === `${framework}js`),
  );

const hostLabel = (host) => (tr) =>
  tr.labels.some(({ name, value }) => name === "host" && value === host);

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
        maxFailures: 60,
        minTestsCount: 300,
        successRate: 0.7,
      },
      ...FRAMEWORKS.map((framework) => ({
        id: `gate-${framework}`,
        maxFailures: 6,
        minTestsCount: 30,
        successRate: 0.75,
        filter: frameworkLabel(framework),
      })),
      ...HOST_NAMES.map((host) => {
        const hostSlug = host === "macOS" ? "macos" : host.toLowerCase();
        return {
          id: `gate-host-${hostSlug}`,
          maxFailures: 20,
          minTestsCount: 100,
          successRate: 0.75,
          filter: hostLabel(host),
        };
      }),
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
    ...Object.fromEntries(
      HOST_NAMES.map((host) => [
        `awesome-host-${host === "macOS" ? "macos" : host.toLowerCase()}`,
        {
          import: "@allurereport/plugin-awesome",
          options: {
            reportName: `Allure 3 · ${host}`,
            singleFile: false,
            reportLanguage: "en",
            open: false,
            publish: true,
            filter: ({ labels }) => labels.some(({ name, value }) => name === "host" && value === host),
          },
        },
      ]),
    ),
  },
};

export default defineConfig(config);
