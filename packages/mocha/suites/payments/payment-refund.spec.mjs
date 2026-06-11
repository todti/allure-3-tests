import { describe, it } from "mocha";
import { testPaymentRefund } from "@allure-tests/shared";

describe("Payments", () => {
  it("Captured payment is fully refunded to the card", async function () {
    this.timeout(30_000);
    await testPaymentRefund({ framework: "mocha", runner: "node" });
  });
});
