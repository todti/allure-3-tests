import { describe, it } from "mocha";
import { testFraudScore } from "@allure-tests/shared";

describe("Payments", function () {
  this.retries(2);

  it("Fraud model scores transaction and auto-approves low-risk payment", async function () {
    this.timeout(30_000);
    await testFraudScore({ framework: "mocha", runner: "node" }, { attempt: this.currentTest?.currentRetry() ?? 0 });
  });
});
