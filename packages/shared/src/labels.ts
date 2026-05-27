import * as allure from "allure-js-commons";
import { frameworkReportName } from "./framework-reports.js";
import { resolveHostName } from "./host.js";
import { applyFrameworkLabels } from "./showcase.js";
import type { ShowcaseContext } from "./types.js";

export type BddLayer = "api" | "ui" | "unit" | "integration" | "e2e";

export type DomainMeta = {
  domain: string;
  epic: string;
  feature: string;
  story: string;
  layer: BddLayer;
  component: string;
  parentSuite?: string;
  suite?: string;
  subSuite?: string;
};

export type EnvironmentInfo = Record<string, string>;

const DOMAIN_META: Record<string, DomainMeta> = {
  "auth-login": {
    domain: "auth",
    epic: "Security",
    feature: "Authentication",
    story: "OAuth2 authorization code",
    layer: "api",
    component: "identity-service",
    parentSuite: "Security",
    suite: "Authentication",
  },
  "catalog-search": {
    domain: "catalog",
    epic: "Commerce",
    feature: "Catalog",
    story: "Search",
    layer: "api",
    component: "catalog-service",
    parentSuite: "Commerce",
    suite: "Catalog",
  },
  "checkout-tax": {
    domain: "checkout",
    epic: "Commerce",
    feature: "Checkout",
    story: "Tax calculation",
    layer: "integration",
    component: "checkout-service",
    parentSuite: "Storefront",
    suite: "Checkout",
    subSuite: "Tax engine",
  },
  "payment-flaky": {
    domain: "payments",
    epic: "Payments",
    feature: "Card processing",
    story: "Gateway retries",
    layer: "integration",
    component: "payment-gateway",
    parentSuite: "Payments",
    suite: "Card processing",
  },
  "inventory-flaky": {
    domain: "inventory",
    epic: "Warehouse",
    feature: "Inventory",
    story: "Stock synchronization",
    layer: "integration",
    component: "warehouse-service",
    parentSuite: "Warehouse",
    suite: "Inventory",
  },
  "email-webhook": {
    domain: "notifications",
    epic: "Notifications",
    feature: "Email",
    story: "Webhook delivery",
    layer: "api",
    component: "notification-service",
    parentSuite: "Notifications",
    suite: "Email",
  },
  "export-attachments": {
    domain: "reporting",
    epic: "Reporting",
    feature: "Exports",
    story: "Attachment bundle",
    layer: "unit",
    component: "report-exporter",
    parentSuite: "Reporting",
    suite: "Exports",
  },
  "cache-retry": {
    domain: "reliability",
    epic: "Platform",
    feature: "Caching",
    story: "Warmup retries",
    layer: "integration",
    component: "cache-layer",
    parentSuite: "Platform",
    suite: "Caching",
  },
  "audit-statuses": {
    domain: "compliance",
    epic: "Compliance",
    feature: "Audit",
    story: "Mixed step statuses",
    layer: "unit",
    component: "audit-pipeline",
    parentSuite: "Compliance",
    suite: "Audit",
  },
  "known-regression": {
    domain: "analytics",
    epic: "Quality",
    feature: "Regression",
    story: "Known defects",
    layer: "e2e",
    component: "analytics-dashboard",
    parentSuite: "Quality",
    suite: "Regression",
  },
  "api-health": {
    domain: "api",
    epic: "Platform",
    feature: "API",
    story: "Health checks",
    layer: "api",
    component: "public-api",
    parentSuite: "Platform",
    suite: "API",
  },
  "user-profile": {
    domain: "users",
    epic: "Accounts",
    feature: "Profile",
    story: "Sensitive fields",
    layer: "api",
    component: "accounts-service",
    parentSuite: "Accounts",
    suite: "Profile",
  },
  "password-reset": {
    domain: "journeys",
    epic: "Customer journeys",
    feature: "Self-service",
    story: "Password reset",
    layer: "e2e",
    component: "self-service-portal",
    parentSuite: "Customer journeys",
    suite: "Self-service",
  },
  "metadata-baseline": {
    domain: "baseline",
    epic: "Allure demo",
    feature: "Runtime API",
    story: "Metadata baseline",
    layer: "unit",
    component: "allure-adapters",
    parentSuite: "Multi-framework suite",
    suite: "Adapter parity",
    subSuite: "Baseline",
  },
};

function hashSeed(input: string): number {
  let hash = 0;
  for (const char of input) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
}

export function buildEnvironmentInfo(framework: string, extra: EnvironmentInfo = {}): EnvironmentInfo {
  const host = resolveHostName();
  const platform = typeof process !== "undefined" ? process.platform : "browser";
  const arch = typeof process !== "undefined" ? process.arch : "unknown";

  return {
    Framework: framework,
    Report: frameworkReportName(framework),
    Host: host,
    Node: typeof process !== "undefined" ? process.version : "browser",
    OS: `${platform}/${arch}`,
    CI: process.env.CI ? "true" : "false",
    Run: process.env.GITHUB_RUN_ID ?? "local",
    Runner_OS: process.env.GITHUB_RUNNER_OS ?? host,
    Coverage_tool: "c8 (demo)",
    ...extra,
  };
}

export function resolveCoverage(domainId: string, framework: string): {
  lines: number;
  branches: number;
  functions: number;
} {
  const seed = hashSeed(`${framework}:${domainId}`);
  const lines = 58 + (seed % 3800) / 100;
  const branches = Math.max(45, lines - 8 - (seed % 700) / 100);
  const functions = Math.min(99.5, lines + 2 + (seed % 500) / 100);

  return {
    lines: Number(lines.toFixed(1)),
    branches: Number(branches.toFixed(1)),
    functions: Number(functions.toFixed(1)),
  };
}

export async function applyCoverageLabels(domainId: string, framework: string): Promise<void> {
  const coverage = resolveCoverage(domainId, framework);
  await allure.label("line_coverage", `${coverage.lines}%`);
  await allure.label("branch_coverage", `${coverage.branches}%`);
  await allure.label("function_coverage", `${coverage.functions}%`);
  await allure.label("coverage_tool", "c8");
  await allure.tag(coverage.lines >= 80 ? "coverage-high" : coverage.lines >= 65 ? "coverage-medium" : "coverage-low");
}

export async function applyBddLabels(meta: DomainMeta): Promise<void> {
  await allure.epic(meta.epic);
  await allure.feature(meta.feature);
  await allure.story(meta.story);
  await allure.label("layer", meta.layer);
  await allure.label("component", meta.component);
  await allure.label("domain", meta.domain);
  await allure.tag("bdd");

  if (meta.parentSuite) {
    await allure.parentSuite(meta.parentSuite);
  }
  if (meta.suite) {
    await allure.suite(meta.suite);
  }
  if (meta.subSuite) {
    await allure.subSuite(meta.subSuite);
  }
}

export async function applyDomainLabels(
  ctx: ShowcaseContext,
  domainId: keyof typeof DOMAIN_META,
): Promise<DomainMeta> {
  const meta = DOMAIN_META[domainId];
  await applyFrameworkLabels(ctx);
  await applyBddLabels(meta);
  await applyCoverageLabels(domainId, ctx.framework);
  return meta;
}

export function getDomainMeta(domainId: keyof typeof DOMAIN_META): DomainMeta {
  return DOMAIN_META[domainId];
}
