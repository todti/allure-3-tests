import * as allure from "allure-js-commons";
import { ContentType, Status } from "allure-js-commons";
import { shouldSimulateTransientFailure } from "./flaky.js";
import type { RuntimeHints, ShowcaseContext } from "./types.js";
import {
  applyFrameworkLabels,
  applyMetadata,
  runAllureFeatureShowcase,
  runHookStyleAttachments,
} from "./showcase.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function scenarioId(ctx: ShowcaseContext, slug: string): string {
  return `${ctx.framework}-${slug}`;
}

async function withScenarioMetadata(
  ctx: ShowcaseContext,
  slug: string,
  title: string,
  extra?: () => Promise<void>,
): Promise<void> {
  await applyFrameworkLabels(ctx);
  await allure.displayName(title);
  await allure.testCaseId(scenarioId(ctx, slug));
  await allure.historyId(`history-${scenarioId(ctx, slug)}`);
  await allure.tags("demo", "allure3", slug);
  if (extra) {
    await extra();
  }
}

export async function scenarioMetadataBaseline(ctx: ShowcaseContext): Promise<void> {
  await runAllureFeatureShowcase(ctx);
}

export async function scenarioDeepNestedSteps(ctx: ShowcaseContext): Promise<void> {
  await withScenarioMetadata(ctx, "nested-steps", "Deep nested Allure steps (5 levels)", async () => {
    await allure.epic("Checkout");
    await allure.feature("Pricing");
    await allure.story("Tax calculation");
    await allure.parentSuite("Commerce");
    await allure.suite("Nested steps");
    await allure.subSuite("Deep hierarchy");
  });

  await allure.step("L1 — checkout orchestration", async () => {
    await allure.parameter("cart_id", `cart-${ctx.framework}`, { excluded: true });

    await allure.step("L2 — validate cart", async (l2) => {
      await l2.parameter("items", "3");

      await allure.step("L3 — price engine", async (l3) => {
        await l3.parameter("currency", "USD");

        await allure.step("L4 — tax module", async (l4) => {
          await l4.parameter("region", "EU");

          await allure.step("L5 — rounding policy", async (l5) => {
            await l5.parameter("precision", "2");
            await allure.attachment(
              "tax-breakdown",
              JSON.stringify({ net: 100, tax: 21, gross: 121 }, null, 2),
              ContentType.JSON,
            );
            await delay(8);
          });
        });
      });
    });
  });
}

export async function scenarioAttachmentGallery(ctx: ShowcaseContext): Promise<void> {
  await withScenarioMetadata(ctx, "attachments", "Attachment gallery (text, json, html, xml, csv)", async () => {
    await allure.severity("normal");
    await allure.feature("Reporting");
    await allure.story("Attachments");
  });

  await allure.step("Collect attachment payloads", async () => {
    await allure.attachment("notes.txt", "Plain text attachment", ContentType.TEXT);
    await allure.attachment(
      "metrics.json",
      JSON.stringify({ latencyMs: 42, framework: ctx.framework }, null, 2),
      ContentType.JSON,
    );
    await allure.attachment(
      "report.html",
      "<html><body><h1>Allure 3</h1><p>HTML attachment</p></body></html>",
      ContentType.HTML,
    );
    await allure.attachment(
      "config.xml",
      "<config><retries>2</retries><flaky>true</flaky></config>",
      ContentType.XML,
    );
    await allure.attachment("export.csv", "id,name\n1,demo\n2,flaky", "text/csv");
    await allure.attachment(
      "tiny-png",
      Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
        "base64",
      ),
      ContentType.PNG,
    );
  });
}

export async function scenarioParameterMatrix(ctx: ShowcaseContext): Promise<void> {
  await withScenarioMetadata(ctx, "parameters", "Parameters: visible, masked, excluded", async () => {
    await allure.feature("Runtime API");
    await allure.story("Parameters");
  });

  await allure.step("User context", async (step) => {
    await step.parameter("username", "demo-user");
    await step.parameter("password", "secret-value", "masked");
    await step.parameter("session_token", "jwt-123", "hidden");
    await step.parameter("roles", "admin,qa");
  });

  await allure.step("Environment matrix", async () => {
    for (const env of ["dev", "stage"]) {
      await allure.step(`Deploy check — ${env}`, async (step) => {
        await step.parameter("environment", env);
        await step.parameter("build", `${env}-${Date.now()}`);
        await delay(4);
      });
    }
  });
}

export async function scenarioStepStatuses(ctx: ShowcaseContext): Promise<void> {
  await withScenarioMetadata(ctx, "step-statuses", "Step statuses: passed, skipped, broken", async () => {
    await allure.severity("minor");
    await allure.feature("Runtime API");
    await allure.story("Statuses");
  });

  await allure.step("Happy path", async () => {
    await allure.logStep("Audit trail entry", Status.PASSED);
  });

  await allure.logStep("Legacy migration skipped — not applicable", Status.SKIPPED);

  await allure.step("Validation with soft issues", async () => {
    await allure.logStep("Schema mismatch in optional field", Status.BROKEN);
    await allure.attachment("validator.log", "WARN optional field 'legacyId' missing", ContentType.TEXT);
  });
}

export async function scenarioAsyncFanOut(ctx: ShowcaseContext): Promise<void> {
  await withScenarioMetadata(ctx, "async-fanout", "Async fan-out inside nested steps", async () => {
    await allure.feature("Runtime API");
    await allure.story("Async");
  });

  await allure.step("Parallel workload", async () => {
    const chunks = await Promise.all(
      ["alpha", "beta", "gamma"].map(
        (name) =>
          allure.step(`Worker — ${name}`, async () => {
            await delay(10 + name.length);
            return `${name}:ok`;
          }),
      ),
    );

    await allure.attachment("worker-results", chunks.join("\n"), ContentType.TEXT);
  });
}

export async function scenarioFlakyPayment(
  ctx: ShowcaseContext,
  hints: RuntimeHints = {},
): Promise<void> {
  const attempt = hints.attempt ?? 0;
  await withScenarioMetadata(ctx, "flaky-payment", "Flaky — payment gateway (retries)", async () => {
    await allure.tags("flaky", "retries");
    await allure.severity("critical");
    await allure.feature("Payments");
    await allure.story("Gateway retries");
  });

  await allure.step("Authorize payment", async (step) => {
    await step.parameter("attempt", String(attempt + 1));
    await step.parameter("gateway", "demo-pay");

    if (
      shouldSimulateTransientFailure(scenarioId(ctx, "flaky-payment"), attempt, 2, 0.25)
    ) {
      await allure.attachment("gateway.log", "HTTP 503 — upstream timeout", ContentType.TEXT);
      throw new Error("Payment gateway timeout (simulated flaky failure)");
    }

    await allure.attachment("receipt.json", JSON.stringify({ status: "authorized" }), ContentType.JSON);
  });
}

export async function scenarioFlakyInventorySync(
  ctx: ShowcaseContext,
  hints: RuntimeHints = {},
): Promise<void> {
  const attempt = hints.attempt ?? 0;
  await withScenarioMetadata(ctx, "flaky-inventory", "Flaky — inventory sync (random + retries)", async () => {
    await allure.tags("flaky", "inventory");
    await allure.feature("Catalog");
    await allure.story("Stock sync");
  });

  await allure.step("Sync stock levels", async (step) => {
    await step.parameter("attempt", String(attempt + 1));

    if (
      shouldSimulateTransientFailure(scenarioId(ctx, "flaky-inventory"), attempt, 1, 0.35)
    ) {
      throw new Error("Inventory shard lock contention (simulated)");
    }

    await allure.logStep("Inventory synchronized", Status.PASSED);
  });
}

export async function scenarioRetryThenPass(
  ctx: ShowcaseContext,
  hints: RuntimeHints = {},
): Promise<void> {
  const attempt = hints.attempt ?? 0;
  await withScenarioMetadata(ctx, "retry-then-pass", "Retry-friendly — fails once, then passes", async () => {
    await allure.tags("retries");
    await allure.feature("Reliability");
    await allure.story("Retry semantics");
  });

  await allure.step("Warmup cache", async () => {
    if (shouldSimulateTransientFailure(scenarioId(ctx, "retry-then-pass"), attempt, 2, 0)) {
      throw new Error("Cache miss on cold start (expected on first attempt)");
    }
    await allure.attachment("cache.state", "HIT", ContentType.TEXT);
  });
}

export async function scenarioKnownFailure(ctx: ShowcaseContext): Promise<void> {
  await withScenarioMetadata(ctx, "known-failure", "Known failure — stable red test for dashboards", async () => {
    await allure.tags("known-failure");
    await allure.severity("blocker");
    await allure.issue("https://github.com/allure-framework/allure-js/issues/2", "DEMO-500");
    await allure.feature("Reliability");
    await allure.story("Failure analytics");
  });

  await allure.step("Validate impossible constraint", async () => {
    await allure.attachment("assertion.log", "Expected 200 but business rule blocked flow", ContentType.TEXT);
    throw new Error("Demo failure — intentionally red for Allure dashboards");
  });
}

export async function scenarioBehavioralGrouping(ctx: ShowcaseContext): Promise<void> {
  await withScenarioMetadata(ctx, "behavior-tree", "Behavior tree — epic/feature/story grouping", async () => {
    await allure.epic("Customer journeys");
    await allure.feature("Self-service");
    await allure.story("Password reset");
    await allure.owner("qa-platform");
    await allure.link("https://allurereport.org/docs/v3/", "Allure docs");
  });

  await allure.step("Request reset token", async () => {
    await delay(5);
  });
  await allure.step("Confirm email delivery", async () => {
    await delay(5);
  });
}

export async function runHookAttachmentsForScenario(
  phase: "before" | "after",
  sameName: boolean,
): Promise<void> {
  await runHookStyleAttachments(phase, sameName);
}
