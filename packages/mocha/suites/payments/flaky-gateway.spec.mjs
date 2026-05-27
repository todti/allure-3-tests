import { describe, it } from "mocha";
import { testFlakyPayment } from "@allure-tests/shared";

describe("Payments", function () {
  this.retries(2);

  it("Payment gateway may timeout before authorization", async function () {
    this.timeout(30_000);
    await testFlakyPayment({ framework: "mocha", runner: "node" }, { attempt: this.currentTest?.currentRetry() ?? 0 });
  });
});
