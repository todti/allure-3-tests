import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkFeatureLabels } from "@allure-tests/shared";

const ctx = { framework: "webdriverio", runner: "node" };

describe("WebdriverIO · Browser commands", () => {
  it("navigates and captures browser metadata", async () => {
    await applyFrameworkFeatureLabels(ctx, "Browser commands", "Navigation and executeScript");

    await allure.step("Navigate to Playwright homepage", async () => {
      await browser.url("https://playwright.dev/");
      await allure.parameter("url", await browser.getUrl());
    });

    await allure.step("Capture page title", async () => {
      const title = await browser.getTitle();
      await allure.parameter("title", title);
      await allure.attachment("page-title", title, ContentType.TEXT);
    });

    await allure.step("Execute script for viewport dimensions", async () => {
      const dims = await browser.execute(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
      }));
      await allure.attachment("viewport", JSON.stringify(dims, null, 2), ContentType.JSON);
      await allure.parameter("width", String(dims.width));
      await allure.parameter("height", String(dims.height));
    });

    await allure.step("Take screenshot", async () => {
      const screenshot = await browser.takeScreenshot();
      await allure.attachment("screenshot", Buffer.from(screenshot, "base64"), ContentType.PNG);
    });
  });

  it("reads DOM attributes via browser.execute()", async () => {
    await applyFrameworkFeatureLabels(ctx, "Browser commands", "browser.execute() DOM inspection");

    await allure.step("Navigate and extract heading tags", async () => {
      await browser.url("https://playwright.dev/");

      const headings = await browser.execute(() => {
        return Array.from(document.querySelectorAll("h1, h2"))
          .slice(0, 5)
          .map((el) => ({ tag: el.tagName, text: el.textContent?.trim().slice(0, 80) }));
      });

      await allure.attachment("headings", JSON.stringify(headings, null, 2), ContentType.JSON);
      await allure.parameter("heading_count", String(headings.length));
    });

    await allure.step("Check cookie jar", async () => {
      const cookies = await browser.getCookies();
      await allure.attachment("cookies", JSON.stringify(cookies.slice(0, 3), null, 2), ContentType.JSON);
      await allure.parameter("cookie_count", String(cookies.length));
    });
  });
});
