export const FRAMEWORK_REPORT_NAMES = {
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
} as const;

export type FrameworkId = keyof typeof FRAMEWORK_REPORT_NAMES;

export function frameworkReportName(framework: string): string {
  return (
    FRAMEWORK_REPORT_NAMES[framework as FrameworkId] ?? `Allure 3 · ${framework}`
  );
}
