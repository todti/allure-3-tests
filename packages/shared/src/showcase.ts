import * as allure from "allure-js-commons";
import { ContentType, Status } from "allure-js-commons";
import { frameworkReportName } from "./framework-reports.js";
import { resolveHostName } from "./host.js";
import type { ShowcaseContext } from "./types.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function applyFrameworkLabels(ctx: ShowcaseContext): Promise<void> {
  await allure.label("framework", ctx.framework);
  await allure.label("report", frameworkReportName(ctx.framework));
  await allure.label("host", resolveHostName());
  await allure.label("language", "typescript");
  if (ctx.runner) {
    await allure.label("runner", ctx.runner);
  }
}

export async function applyMetadata(ctx: ShowcaseContext): Promise<void> {
  await allure.description(
    "Demonstrates Allure 3 metadata API: owner, severity, tags, links, TMS, issue, and behavior hierarchy.",
  );
  await allure.owner("allure-demo");
  await allure.tags("demo", "allure3", "metadata");
  await allure.severity("critical");
  await allure.issue("https://github.com/allure-framework/allure-js/issues/1", "ALLURE-JS-1");
  await allure.tms("https://github.com/allure-framework/allure-js", "TMS-1");
  await allure.link("https://allurereport.org/docs/v3/", "Allure 3 docs");
  await allure.testCaseId(`allure-features-showcase-${ctx.framework}`);
  await allure.epic("Allure demo");
  await allure.feature("Runtime API");
  await allure.story("Metadata and labels");
  await allure.parentSuite("Multi-framework suite");
  await allure.suite("Shared scenarios");
  await allure.subSuite("Allure features");
}

export async function runStepsAndParameters(): Promise<void> {
  await allure.parameter("auth_method", "password");
  await allure.parameter("timestamp", new Date().toISOString(), { excluded: true });

  await allure.step("Parent step with nested sub-steps", async () => {
    await allure.step("Sub-step A", async (step) => {
      await step.parameter("key", "alpha");
      await delay(5);
    });
    await allure.step("Sub-step B", async (step) => {
      await step.parameter("key", "beta");
      await delay(5);
    });
  });

  await allure.logStep("Skipped log step example", Status.SKIPPED);
}

export async function runAttachments(ctx: ShowcaseContext): Promise<void> {
  await allure.attachment("plain-text", "Attachment from test body", ContentType.TEXT);
  await allure.attachment(
    "json-payload",
    JSON.stringify({ framework: ctx.framework, ok: true }),
    ContentType.JSON,
  );

  if (ctx.attach) {
    await ctx.attach("playwright-style-attach", "via test.info().attach", "text/plain");
  }
}

export async function runAsyncPatterns(): Promise<void> {
  await allure.step("Parallel async work inside a step", async () => {
    const results = await Promise.all([
      delay(10).then(() => "task-1"),
      delay(15).then(() => "task-2"),
      Promise.resolve().then(async () => {
        await delay(5);
        return "microtask";
      }),
    ]);
    await allure.attachment("parallel-results", results.join(", "), ContentType.TEXT);
  });
}

export async function runHttpSmoke(): Promise<void> {
  await allure.step("HTTP smoke without browser", async () => {
    const response = await fetch("https://playwright.dev/", { redirect: "follow" });
    await allure.parameter("status", String(response.status));
    await allure.attachment("response-headers", [...response.headers.entries()].join("\n"), ContentType.TEXT);
  });
}

export async function runBrowserSmoke(ctx: ShowcaseContext): Promise<void> {
  if (!ctx.browser) {
    return;
  }

  await allure.step("Browser smoke", async () => {
    await ctx.browser!.goto("https://playwright.dev/");
    const title = await ctx.browser!.getTitle();
    await allure.parameter("page_title", title);
    await allure.attachment("page-title", title, ContentType.TEXT);
  });
}

export async function runHookStyleAttachments(
  phase: "before" | "after",
  sameName: boolean,
): Promise<void> {
  const name = sameName ? "hook-attachment" : `${phase}-hook-data`;
  await allure.attachment(name, `Data ${phase} test (${sameName ? "same" : "unique"} name)`, ContentType.TEXT);
}

/** Full showcase invoked from each framework's main test. */
export async function runAllureFeatureShowcase(ctx: ShowcaseContext): Promise<void> {
  await applyFrameworkLabels(ctx);
  await applyMetadata(ctx);
  await runStepsAndParameters();
  await runAttachments(ctx);
  await runAsyncPatterns();
  if (!ctx.skipHttpSmoke) {
    await runHttpSmoke();
  }
  await runBrowserSmoke(ctx);
}
