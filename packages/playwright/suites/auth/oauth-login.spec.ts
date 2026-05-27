import { test } from "@playwright/test";
import { testAuthLogin } from "@allure-tests/shared";

test.describe("Authentication", () => {
  test("OAuth login grants access token", async ({}) => {
    await testAuthLogin({ framework: "playwright", runner: "node" });
  });
});
