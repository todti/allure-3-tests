import { describe, it } from "mocha";
import { testCheckoutTax } from "@allure-tests/shared";

describe("Checkout", () => {
  it("Checkout tax engine calculates VAT in nested steps", async function () {
    this.timeout(30_000);
    await testCheckoutTax({ framework: "bun", runner: "bun" });
  });
});
