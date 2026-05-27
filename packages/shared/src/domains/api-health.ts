import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkLabels, runBrowserSmoke } from "../showcase.js";
import type { ShowcaseContext } from "../types.js";

export async function testApiHealth(ctx: ShowcaseContext): Promise<void> {
  await applyFrameworkLabels(ctx);
  await allure.displayName("Public API health endpoint responds with 200");
  await allure.testCaseId(`${ctx.framework}-api-health`);
  await allure.epic("Platform");
  await allure.feature("API");
  await allure.story("Health checks");
  await allure.tag("smoke");

  await allure.step("GET /health", async () => {
    const response = await fetch("https://playwright.dev/", { redirect: "follow" });
    await allure.parameter("status", String(response.status));
    await allure.parameter("content_type", response.headers.get("content-type") ?? "unknown");
    await allure.attachment("response-headers", [...response.headers.entries()].slice(0, 8).join("\n"), ContentType.TEXT);
  });

  if (!ctx.skipHttpSmoke) {
    await runBrowserSmoke(ctx);
  }
}
