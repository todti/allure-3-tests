import { test } from "@playwright/test";
import { testEmailWebhook } from "@allure-tests/shared";

test.describe("Notifications", () => {
  test("Email provider webhook fan-out completes asynchronously", async ({}) => {
    await testEmailWebhook({ framework: "playwright", runner: "node" });
  });
});
