import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { resolveAttempt } from "../flaky.js";
import { applyDomainLabels } from "../labels.js";
import { runBrowserSmoke } from "../showcase.js";
import type { RuntimeHints, ShowcaseContext } from "../types.js";

export async function testKnownRegression(ctx: ShowcaseContext, hints: RuntimeHints = {}): Promise<void> {
  const testId = `${ctx.framework}-known-regression`;
  const attempt = resolveAttempt(testId, hints.attempt ?? 0);

  await applyDomainLabels(ctx, "known-regression");
  await allure.displayName("Known regression remains red for dashboard analytics");
  await allure.testCaseId(testId);
  await allure.tag("known-failure");
  await allure.severity("blocker");
  await allure.issue("https://github.com/allure-framework/allure-js/issues/2", "DEMO-500");
  await allure.parameter("attempt", String(attempt));

  await runBrowserSmoke(ctx);

  await allure.step("Verify legacy billing rule", async () => {
    await allure.attachment(
      "assertion.log",
      `Attempt ${attempt}: Expected refund cap = 100, actual = ${150 + (attempt - 1) * 25}`,
      ContentType.TEXT,
    );
    throw new Error(`Demo regression — intentionally failing for Allure dashboards (attempt ${attempt})`);
  });
}
