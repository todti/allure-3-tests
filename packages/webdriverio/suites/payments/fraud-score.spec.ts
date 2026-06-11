import { testFraudScore } from "@allure-tests/shared";

describe("Payments", function () {
  it("Fraud model scores transaction and auto-approves low-risk payment", async function () {
    await testFraudScore(
      { framework: "webdriverio", runner: "node" },
      { attempt: this.currentTest?.currentRetry() ?? 0 },
    );
  });
});
