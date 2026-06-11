import * as allure from "allure-js-commons";
import { ContentType, Status } from "allure-js-commons";
import { shouldSimulateTransientFailure } from "../flaky.js";
import { applyDomainLabels } from "../labels.js";
import type { RuntimeHints, ShowcaseContext } from "../types.js";

export async function testFraudScore(ctx: ShowcaseContext, hints: RuntimeHints = {}): Promise<void> {
  const attempt = hints.attempt ?? 0;
  const testId = `${ctx.framework}-fraud-score`;

  await applyDomainLabels(ctx, "fraud-score");
  await allure.displayName("Fraud model scores transaction and auto-approves low-risk payment");
  await allure.testCaseId(testId);
  await allure.historyId(`history-${testId}`);
  await allure.severity("critical");
  await allure.owner("fraud-team");
  await allure.tag("fraud");
  await allure.tag("flaky");

  await allure.step("Collect transaction signals", async (step) => {
    await step.parameter("ip_country", "US");
    await step.parameter("device_fingerprint", "fp_abc123");
    await step.parameter("velocity_24h", "3");
    await step.parameter("attempt", String(attempt + 1));
  });

  await allure.step("Run fraud scoring model", async (step) => {
    await step.parameter("model_version", "v4.2.1");

    if (shouldSimulateTransientFailure(testId, attempt, 1, 0.3)) {
      await allure.attachment("fraud-signal", "elevated risk score — manual review triggered", ContentType.TEXT);
      throw new Error("Fraud score above threshold: manual review required (simulated)");
    }

    await step.parameter("risk_score", "0.12");
    await step.parameter("decision", "approve");
  });

  await allure.step("Apply rule engine override", async () => {
    await allure.logStep("Velocity rules passed", Status.PASSED);
    await allure.logStep("BIN country check passed", Status.PASSED);
    await allure.attachment(
      "fraud-result",
      JSON.stringify({ score: 0.12, decision: "approve", rules_triggered: [] }, null, 2),
      ContentType.JSON,
    );
  });
}
