import { describe, it } from "mocha";
import { testPaymentAuthorization } from "@allure-tests/shared";

describe("Payments", () => {
  it("Payment intent is authorized against card token", async function () {
    this.timeout(30_000);
    await testPaymentAuthorization({ framework: "mocha", runner: "node" });
  });
});
