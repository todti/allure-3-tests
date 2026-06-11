import * as allure from "allure-js-commons";
import { ContentType, Status } from "allure-js-commons";
import { applyDomainLabels } from "../labels.js";
import type { ShowcaseContext } from "../types.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function testPaymentRefund(ctx: ShowcaseContext): Promise<void> {
  await applyDomainLabels(ctx, "payment-refund");
  await allure.displayName("Captured payment is fully refunded to the card");
  await allure.testCaseId(`${ctx.framework}-payment-refund`);
  await allure.historyId(`history-${ctx.framework}-payment-refund`);
  await allure.severity("critical");
  await allure.owner("payments-team");
  await allure.tag("refund");

  await allure.step("Locate original transaction", async (step) => {
    await step.parameter("transaction_id", `txn-${ctx.framework}-demo`);
    await step.parameter("settled", "true");
    await step.parameter("refundable_amount", "4999");
  });

  await allure.step("Validate refund eligibility", async (step) => {
    await step.parameter("days_since_capture", "2");
    await step.parameter("policy_window_days", "180");
    await allure.logStep("Refund window check passed", Status.PASSED);
  });

  await allure.step("Submit reverse to acquiring bank", async (step) => {
    await step.parameter("refund_reason", "customer_request");
    await step.parameter("amount", "4999");
    await allure.attachment(
      "refund-request",
      JSON.stringify({ transaction_id: "txn-demo", amount: 4999, reason: "customer_request" }, null, 2),
      ContentType.JSON,
    );
    await delay(8);
  });

  await allure.step("Confirm settlement update", async () => {
    await allure.attachment(
      "refund-confirmation",
      JSON.stringify({ refund_id: "ref_demo", status: "succeeded", expected_arrival: "3-5 business days" }, null, 2),
      ContentType.JSON,
    );
  });
}
