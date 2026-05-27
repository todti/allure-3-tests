import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyDomainLabels } from "../labels.js";
import { runBrowserSmoke } from "../showcase.js";
import type { ShowcaseContext } from "../types.js";

/** Legacy baseline kept as a standalone domain test (metadata + attachments + async). */
export async function testMetadataShowcase(ctx: ShowcaseContext): Promise<void> {
  await applyDomainLabels(ctx, "metadata-baseline");
  await allure.displayName("Allure metadata baseline documents runtime API surface");
  await allure.testCaseId(`${ctx.framework}-metadata-baseline`);
  await allure.description("Baseline metadata, links, hierarchy, and attachments for adapter comparison.");
  await allure.owner("allure-demo");
  await allure.tags("demo", "allure3", "baseline");
  await allure.severity("critical");
  await allure.issue("https://github.com/allure-framework/allure-js/issues/1", "ALLURE-JS-1");
  await allure.tms("https://github.com/allure-framework/allure-js", "TMS-1");
  await allure.link("https://allurereport.org/docs/v3/", "Allure 3 docs");

  await runBrowserSmoke(ctx);

  await allure.step("Record adapter metadata", async (step) => {
    await step.parameter("adapter", ctx.framework);
    await allure.attachment("baseline.json", JSON.stringify({ ok: true, framework: ctx.framework }), ContentType.JSON);
  });
}
