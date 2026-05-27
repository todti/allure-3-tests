import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyDomainLabels } from "../labels.js";
import type { ShowcaseContext } from "../types.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function testEmailWebhook(ctx: ShowcaseContext): Promise<void> {
  await applyDomainLabels(ctx, "email-webhook");
  await allure.displayName("Email provider webhook fan-out completes asynchronously");
  await allure.testCaseId(`${ctx.framework}-email-webhook`);
  await allure.tag("async");

  await allure.step("Dispatch notification batch", async () => {
    const deliveries = await Promise.all([
      allure.step("Send to marketing topic", async () => {
        await delay(12);
        return "marketing:delivered";
      }),
      allure.step("Send to billing topic", async () => {
        await delay(8);
        return "billing:delivered";
      }),
      allure.step("Send to security topic", async () => {
        await delay(6);
        return "security:delivered";
      }),
    ]);

    await allure.attachment("webhook-results", deliveries.join("\n"), ContentType.TEXT);
  });
}
