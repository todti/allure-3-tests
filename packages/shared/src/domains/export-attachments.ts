import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyDomainLabels } from "../labels.js";
import type { ShowcaseContext } from "../types.js";

export async function testExportAttachments(ctx: ShowcaseContext): Promise<void> {
  await applyDomainLabels(ctx, "export-attachments");
  await allure.displayName("Reporting export bundles multiple attachment formats");
  await allure.testCaseId(`${ctx.framework}-export-attachments`);
  await allure.severity("normal");

  await allure.step("Generate export bundle", async () => {
    await allure.attachment("summary.txt", "Export completed", ContentType.TEXT);
    await allure.attachment("metrics.json", JSON.stringify({ rows: 128, durationMs: 420 }, null, 2), ContentType.JSON);
    await allure.attachment(
      "preview.html",
      "<html><body><h1>Export preview</h1></body></html>",
      ContentType.HTML,
    );
    await allure.attachment("config.xml", "<config enabled=\"true\"/>", ContentType.XML);
    await allure.attachment("users.csv", "id,email\n1,demo@allure.dev", "text/csv");
    await allure.attachment(
      "sparkline.png",
      Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
        "base64",
      ),
      ContentType.PNG,
    );
  });
}
