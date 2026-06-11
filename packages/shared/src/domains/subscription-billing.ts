import * as allure from "allure-js-commons";
import { ContentType, Status } from "allure-js-commons";
import { applyDomainLabels } from "../labels.js";
import type { ShowcaseContext } from "../types.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function testSubscriptionBilling(ctx: ShowcaseContext): Promise<void> {
  await applyDomainLabels(ctx, "subscription-billing");
  await allure.displayName("Recurring subscription cycle charges stored payment method");
  await allure.testCaseId(`${ctx.framework}-subscription-billing`);
  await allure.historyId(`history-${ctx.framework}-subscription-billing`);
  await allure.severity("critical");
  await allure.owner("billing-team");
  await allure.tag("subscriptions");
  await allure.tag("billing");

  await allure.step("Fetch active subscriptions due for billing", async (step) => {
    await step.parameter("billing_cycle", "monthly");
    await step.parameter("due_count", "3");
    await step.parameter("currency", "USD");
  });

  await allure.step("Generate invoices", async () => {
    for (const [plan, amount] of [["starter", "900"], ["pro", "2900"], ["enterprise", "9900"]]) {
      await allure.step(`Invoice — ${plan} plan`, async (step) => {
        await step.parameter("plan", plan);
        await step.parameter("amount_cents", amount);
      });
    }
  });

  await allure.step("Charge stored payment methods", async (step) => {
    await step.parameter("method", "card_on_file");
    await step.parameter("retries_allowed", "3");
    await allure.attachment(
      "billing-summary",
      JSON.stringify({ invoiced: 3, charged: 3, failed: 0, total_usd: 137.0 }, null, 2),
      ContentType.JSON,
    );
    await delay(6);
  });

  await allure.step("Emit billing lifecycle events", async () => {
    await allure.logStep("invoice.created dispatched", Status.PASSED);
    await allure.logStep("payment.succeeded dispatched", Status.PASSED);
    await allure.logStep("subscription.renewed dispatched", Status.PASSED);
  });
}
