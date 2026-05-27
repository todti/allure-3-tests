import { describe, it, jest } from "@jest/globals";
import { testCheckoutTax } from "@allure-tests/shared";

describe("Checkout", () => {
  it("Checkout tax engine calculates VAT in nested steps", async () => {
    await testCheckoutTax({ framework: "jest", runner: "node" });
  });
});
