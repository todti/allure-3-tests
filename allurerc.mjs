import { defineConfig } from "allure";
import { env } from "node:process";

const { ALLURE_SERVICE_ACCESS_TOKEN } = env;

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

const FRAMEWORKS = Object.keys(FRAMEWORK_REPORT_NAMES);
const OS_NAMES = ["Linux", "macOS", "Windows"];

const OS_ENVIRONMENTS = {
  linux: {
    name: "Linux",
    matcher: ({ labels }) => labels.find(({ name, value }) => name === "os" && value === "Linux"),
    variables: { OS: "Linux", Runner: "GitHub Actions / local Linux" },
  },
  macos: {
    name: "macOS",
    matcher: ({ labels }) => labels.find(({ name, value }) => name === "os" && value === "macOS"),
    variables: { OS: "macOS", Runner: "GitHub Actions / local macOS" },
  },
  windows: {
    name: "Windows",
    matcher: ({ labels }) => labels.find(({ name, value }) => name === "os" && value === "Windows"),
    variables: { OS: "Windows", Runner: "GitHub Actions / local Windows" },
  },
};

const osLabel = (os) => (tr) => tr.labels.find(({ name, value }) => name === "os" && value === os);
const frameworkLabel = (fw) => (tr) =>
  tr.labels.find(({ name, value }) => name === "framework" && (value === fw || value === `${fw}js`));
const severityLabel =
  (...severities) =>
  (tr) =>
    tr.labels.find(({ name, value }) => name === "severity" && severities.includes(value));

const qualityGateRules = [
  {
    id: "critical-blocker-fast-fail",
    maxFailures: 0,
    fastFail: true,
    filter: severityLabel("critical", "blocker"),
  },
  {
    id: "global-gate",
    maxFailures: 60,
    minTestsCount: 300,
    successRate: 0.7,
    environmentsTested: ["linux", "macos", "windows"],
  },
  ...FRAMEWORKS.map((fw) => ({
    id: `gate-${fw}`,
    maxFailures: 6,
    minTestsCount: 30,
    successRate: 0.75,
    filter: frameworkLabel(fw),
  })),
  ...OS_NAMES.map((os) => {
    const osSlug = os === "macOS" ? "macos" : os.toLowerCase();
    return {
      id: `gate-os-${osSlug}`,
      maxFailures: 20,
      minTestsCount: 100,
      successRate: 0.75,
      filter: osLabel(os),
    };
  }),
];

/** @type {import("allure").AllureConfig} */
const config = {
  name: "Allure 3 · All Frameworks",
  output: "./allure-report",
  historyPath: "./history.jsonl",
  allowedEnvironments: ["linux", "macos", "windows"],
  environments: OS_ENVIRONMENTS,
  variables: {
    Project: "Allure 3 multi-framework demo",
    Repository: "https://github.com/todti/allure-3-tests",
    "CI run": env.GITHUB_RUN_ID ?? "local",
  },
  globalAttachments: ["./allure-global/**", "./packages/*/allure-global/**"],
  ...(env.ALLURE_STAGE === "matrix"
    ? {}
    : { qualityGate: { rules: qualityGateRules } }),
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
    awesomeBDD: {
      import: "@allurereport/plugin-awesome",
      options: {
        reportName: "Allure 3 · BDD view",
        singleFile: false,
        reportLanguage: "en",
        open: false,
        publish: true,
        groupBy: ["epic", "feature", "story"],
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
      options: { groupBy: "none" },
    },
    ...Object.fromEntries(
      FRAMEWORKS.map((fw) => [
        `awesome-${fw}`,
        {
          import: "@allurereport/plugin-awesome",
          options: {
            reportName: FRAMEWORK_REPORT_NAMES[fw],
            singleFile: false,
            reportLanguage: "en",
            open: false,
            publish: true,
            filter: ({ labels }) =>
              labels.find(({ name, value }) => name === "report" && value === FRAMEWORK_REPORT_NAMES[fw]),
          },
        },
      ]),
    ),
  },
};

if (ALLURE_SERVICE_ACCESS_TOKEN) {
  config.allureService = { accessToken: ALLURE_SERVICE_ACCESS_TOKEN };
}

export default defineConfig(config);
