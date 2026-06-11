import { describe, it } from "@jest/globals";
import { testPaymentRefund } from "@allure-tests/shared";

describe("Payments", () => {
  it("Captured payment is fully refunded to the card", async () => {
    await testPaymentRefund({ framework: "jest", runner: "node" });
  });
});
