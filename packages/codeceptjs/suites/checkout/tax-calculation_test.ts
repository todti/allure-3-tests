import { testCheckoutTax } from "@allure-tests/shared";

Feature("Checkout");

Scenario("Checkout tax engine calculates VAT in nested steps", async () => {
  await testCheckoutTax({ framework: "codeceptjs", runner: "node" });
});
