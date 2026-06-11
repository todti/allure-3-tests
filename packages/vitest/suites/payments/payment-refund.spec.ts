import { describe, it } from "vitest";
import { testPaymentRefund } from "@allure-tests/shared";

describe("Payments", () => {
  it("Captured payment is fully refunded to the card", async () => {
    await testPaymentRefund({ framework: "vitest", runner: "node" });
  }, 30_000);
});
