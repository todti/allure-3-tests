import { describe, it } from "vitest";
import { testPaymentAuthorization } from "@allure-tests/shared";

describe("Payments", () => {
  it("Payment intent is authorized against card token", async () => {
    await testPaymentAuthorization({ framework: "vitest", runner: "node" });
  }, 30_000);
});
