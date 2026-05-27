import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { shouldSimulateTransientFailure } from "../flaky.js";
import { applyFrameworkLabels } from "../showcase.js";
import type { RuntimeHints, ShowcaseContext } from "../types.js";

export async function testFlakyPayment(
  ctx: ShowcaseContext,
  hints: RuntimeHints = {},
): Promise<void> {
  const attempt = hints.attempt ?? 0;
  const testId = `${ctx.framework}-payment-gateway`;

  await applyFrameworkLabels(ctx);
  await allure.displayName("Payment gateway may timeout before authorization");
  await allure.testCaseId(testId);
  await allure.epic("Payments");
  await allure.feature("Card processing");
  await allure.story("Gateway retries");
  await allure.tag("flaky");
  await allure.severity("critical");

  await allure.step("Submit card payment", async (step) => {
    await step.parameter("attempt", String(attempt + 1));
    await step.parameter("merchant", "demo-store");
    await step.parameter("amount", "129.99");

    if (shouldSimulateTransientFailure(testId, attempt, 2, 0.25)) {
      await allure.attachment("gateway.log", "HTTP 503 upstream timeout", ContentType.TEXT);
      throw new Error("Payment gateway timeout (simulated flaky failure)");
    }

    await allure.attachment("receipt", JSON.stringify({ authorization: "AUTH-OK" }), ContentType.JSON);
  });
}
