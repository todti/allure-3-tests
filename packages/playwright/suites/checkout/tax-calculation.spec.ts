import { test } from "@playwright/test";
import { testCheckoutTax } from "@allure-tests/shared";

test.describe("Checkout", () => {
  test("Checkout tax engine calculates VAT in nested steps", async ({}) => {
    await testCheckoutTax({ framework: "playwright", runner: "node" });
  });
});
