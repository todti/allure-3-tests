import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyDomainLabels } from "../labels.js";
import type { ShowcaseContext } from "../types.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function testPaymentAuthorization(ctx: ShowcaseContext): Promise<void> {
  await applyDomainLabels(ctx, "payment-authorization");
  await allure.displayName("Payment intent is authorized against card token");
  await allure.testCaseId(`${ctx.framework}-payment-authorization`);
  await allure.historyId(`history-${ctx.framework}-payment-authorization`);
  await allure.severity("blocker");
  await allure.owner("payments-team");
  await allure.tag("authorization");

  await allure.step("Create payment intent", async (step) => {
    await step.parameter("amount", "4999");
    await step.parameter("currency", "USD");
    await step.parameter("capture_method", "manual");
    await allure.attachment(
      "intent",
      JSON.stringify({ id: "pi_demo", status: "requires_confirmation" }, null, 2),
      ContentType.JSON,
    );
  });

  await allure.step("Confirm intent with card token", async (step) => {
    await step.parameter("token", "tok_demo_xxxx", "masked");
    await step.parameter("3ds_required", "false");
    await delay(10);
  });

  await allure.step("Receive authorization code", async (step) => {
    await step.parameter("auth_code", "AUT-12345678");
    await step.parameter("avs_result", "Y");
    await step.parameter("cvv_result", "M");
    await allure.attachment(
      "authorization-response",
      JSON.stringify({ status: "authorized", auth_code: "AUT-12345678", amount_authorized: 4999 }, null, 2),
      ContentType.JSON,
    );
  });
}
