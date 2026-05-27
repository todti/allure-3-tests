import { test } from "@playwright/test";
import { testApiHealth } from "@allure-tests/shared";

test.describe("API", () => {
  test("Public API health endpoint responds with 200", async ({ page }) => {
    await testApiHealth({
      framework: "playwright",
      runner: "node",
      attach: async (name, body, contentType) => {
        await test.info().attach(name, { body, contentType });
      },
      browser: {
        goto: (url) => page.goto(url),
        getTitle: () => page.title(),
      },
    });
  });
});
