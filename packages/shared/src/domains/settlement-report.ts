import * as allure from "allure-js-commons";
import { ContentType, Status } from "allure-js-commons";
import { applyDomainLabels } from "../labels.js";
import type { ShowcaseContext } from "../types.js";

export async function testSettlementReport(ctx: ShowcaseContext): Promise<void> {
  await applyDomainLabels(ctx, "settlement-report");
  await allure.displayName("Daily settlement report is generated and submitted to acquiring bank");
  await allure.testCaseId(`${ctx.framework}-settlement-report`);
  await allure.historyId(`history-${ctx.framework}-settlement-report`);
  await allure.severity("normal");
  await allure.owner("finance-team");
  await allure.tag("settlement");
  await allure.tag("finance");

  await allure.step("Aggregate successful transactions", async (step) => {
    await step.parameter("date", "2024-01-15");
    await step.parameter("transaction_count", "1482");
    await step.parameter("gross_volume_usd", "148250.00");
  });

  await allure.step("Compute net amounts per merchant", async () => {
    await allure.step("Deduct processing fees", async (step) => {
      await step.parameter("fee_rate", "2.9%");
      await step.parameter("fixed_fee_per_txn", "0.30");
      await step.parameter("total_fees_usd", "4748.75");
    });
    await allure.step("Apply currency conversion", async (step) => {
      await step.parameter("base_currency", "USD");
      await step.parameter("fx_pairs_processed", "4");
    });
  });

  await allure.step("Generate settlement file", async (step) => {
    await step.parameter("format", "ISO 20022");
    await step.parameter("merchant_count", "12");
    await allure.attachment(
      "settlement-preview",
      JSON.stringify({ date: "2024-01-15", net_usd: 143501.25, merchants: 12, status: "ready" }, null, 2),
      ContentType.JSON,
    );
  });

  await allure.step("Submit to acquiring bank", async (step) => {
    await step.parameter("bank", "Demo Acquiring Corp");
    await step.parameter("protocol", "SFTP/PGP");
    await allure.logStep("File integrity check passed", Status.PASSED);
    await allure.attachment("submission-receipt", "ACK-20240115-001482", ContentType.TEXT);
  });
}
