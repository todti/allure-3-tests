import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkLabels } from "../showcase.js";
import type { ShowcaseContext } from "../types.js";

export async function testKnownRegression(ctx: ShowcaseContext): Promise<void> {
  await applyFrameworkLabels(ctx);
  await allure.displayName("Known regression remains red for dashboard analytics");
  await allure.testCaseId(`${ctx.framework}-known-regression`);
  await allure.epic("Quality");
  await allure.feature("Regression");
  await allure.story("Known defects");
  await allure.tag("known-failure");
  await allure.severity("blocker");
  await allure.issue("https://github.com/allure-framework/allure-js/issues/2", "DEMO-500");

  await allure.step("Verify legacy billing rule", async () => {
    await allure.attachment("assertion.log", "Expected refund cap = 100", ContentType.TEXT);
    throw new Error("Demo regression — intentionally failing for Allure dashboards");
  });
}
