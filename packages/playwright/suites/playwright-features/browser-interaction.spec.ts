import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkFeatureLabels } from "@allure-tests/shared";

const ctx = { framework: "playwright", runner: "node" } as const;

test.describe("Playwright · Browser interaction", () => {
  test("navigates, asserts title, and attaches screenshot", async ({ page }) => {
    await applyFrameworkFeatureLabels(ctx, "Browser interaction", "Navigation and screenshots");

    await allure.step("Navigate to Playwright homepage", async () => {
      await page.goto("https://playwright.dev/");
      await allure.parameter("url", "https://playwright.dev/");
    });

    await test.step("Assert page title", async () => {
      await expect(page).toHaveTitle(/Playwright/);
      const title = await page.title();
      await allure.parameter("title", title);
      await allure.attachment("page-title", title, ContentType.TEXT);
    });

    await allure.step("Capture screenshot", async () => {
      const screenshot = await page.screenshot({ fullPage: false });
      await allure.attachment("homepage-screenshot", screenshot, ContentType.PNG);
    });

    await allure.step("Extract visible headings", async () => {
      const headings = await page.locator("h1, h2").allTextContents();
      await allure.attachment(
        "headings",
        JSON.stringify(headings.slice(0, 5), null, 2),
        ContentType.JSON,
      );
    });
  });

  test("intercepts network request and validates mock response", async ({ page }) => {
    await applyFrameworkFeatureLabels(ctx, "Network mocking", "page.route() intercepts");

    const intercepted: string[] = [];

    await allure.step("Register route intercept for /api/status", async () => {
      await page.route("**/api/status", async (route) => {
        intercepted.push(route.request().url());
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ ok: true, environment: "mocked" }),
        });
      });
      await allure.attachment("intercept-pattern", "**/api/status", ContentType.TEXT);
    });

    await test.step("Trigger request via evaluate", async () => {
      await page.goto("about:blank");
      const result = await page.evaluate(async () => {
        const res = await fetch("/api/status");
        return res.json();
      });
      await allure.attachment("mock-response", JSON.stringify(result, null, 2), ContentType.JSON);
      await allure.parameter("ok", String(result.ok));
      await allure.parameter("environment", result.environment);
    });

    await allure.step("Verify intercept was triggered", async () => {
      await allure.attachment("intercepted-urls", JSON.stringify(intercepted, null, 2), ContentType.JSON);
    });
  });
});
