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

const OS_NAMES = ["Linux", "macOS", "Windows"];

const OS_ENVIRONMENTS = {
  linux: {
    name: "Linux",
    matcher: ({ labels }) => labels.some(({ name, value }) => name === "os" && value === "Linux"),
    variables: {
      OS: "Linux",
      Runner: "GitHub Actions / local Linux",
    },
  },
  macos: {
    name: "macOS",
    matcher: ({ labels }) => labels.some(({ name, value }) => name === "os" && value === "macOS"),
    variables: {
      OS: "macOS",
      Runner: "GitHub Actions / local macOS",
    },
  },
  windows: {
    name: "Windows",
    matcher: ({ labels }) => labels.some(({ name, value }) => name === "os" && value === "Windows"),
    variables: {
      OS: "Windows",
      Runner: "GitHub Actions / local Windows",
    },
  },
};

const FRAMEWORKS = Object.keys(FRAMEWORK_REPORT_NAMES);

const frameworkLabel = (framework) => (tr) =>
  tr.labels.some(
    ({ name, value }) => name === "framework" && (value === framework || value === `${framework}js`),
  );

const osLabel = (os) => (tr) => tr.labels.some(({ name, value }) => name === "os" && value === os);

const severityLabel =
  (...severities) =>
  (tr) =>
    tr.labels.some(({ name, value }) => name === "severity" && severities.includes(value));

/** https://allurereport.org/docs/quality-gate/ */
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
    environmentsTested: ["Linux", "macOS", "Windows"],
  },
  ...FRAMEWORKS.map((framework) => ({
    id: `gate-${framework}`,
    maxFailures: 6,
    minTestsCount: 30,
    successRate: 0.75,
    filter: frameworkLabel(framework),
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
  variables: {
    Project: "Allure 3 multi-framework demo",
    Repository: "https://github.com/todti/allure-3-tests",
    "CI run": process.env.GITHUB_RUN_ID ?? "local",
  },
  environments: OS_ENVIRONMENTS,
  // https://allurereport.org/docs/global-errors-and-attachments/#custom-file-attachments
  globalAttachments: ["./allure-global/**", "./packages/*/allure-global/**"],
  ...(process.env.ALLURE_DISABLE_QUALITY_GATE === "true"
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
