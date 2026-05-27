import * as allure from "allure-js-commons";
import { ContentType, Status } from "allure-js-commons";
import { applyDomainLabels } from "../labels.js";
import type { ShowcaseContext } from "../types.js";

export async function testAuditStatuses(ctx: ShowcaseContext): Promise<void> {
  await applyDomainLabels(ctx, "audit-statuses");
  await allure.displayName("Audit pipeline records passed, skipped, and broken steps");
  await allure.testCaseId(`${ctx.framework}-audit-statuses`);
  await allure.severity("minor");

  await allure.step("Collect audit events", async () => {
    await allure.logStep("Security scan completed", Status.PASSED);
    await allure.logStep("Legacy exporter skipped — deprecated", Status.SKIPPED);
    await allure.logStep("Optional schema drift detected", Status.BROKEN);
    await allure.attachment("audit.log", "3 events stored", ContentType.TEXT);
  });
}
