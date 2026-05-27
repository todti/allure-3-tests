import { testCheckoutTax } from "@allure-tests/shared";

describe("Checkout", () => {
  it("Checkout tax engine calculates VAT in nested steps", async () => {
    await testCheckoutTax({ framework: "webdriverio", runner: "node" });
  });
});
