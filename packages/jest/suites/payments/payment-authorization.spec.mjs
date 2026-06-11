import { describe, it } from "@jest/globals";
import { testPaymentAuthorization } from "@allure-tests/shared";

describe("Payments", () => {
  it("Payment intent is authorized against card token", async () => {
    await testPaymentAuthorization({ framework: "jest", runner: "node" });
  });
});
