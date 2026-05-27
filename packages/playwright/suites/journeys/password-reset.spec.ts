import { test } from "@playwright/test";
import { testPasswordReset } from "@allure-tests/shared";

test.describe("Customer journeys", () => {
  test("Password reset journey sends token and confirms delivery", async ({}) => {
    await testPasswordReset({ framework: "playwright", runner: "node" });
  });
});
