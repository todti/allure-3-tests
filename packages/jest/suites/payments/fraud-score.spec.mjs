import { describe, it, jest } from "@jest/globals";
import { testFraudScore } from "@allure-tests/shared";

jest.retryTimes(2, { logErrorsBeforeRetry: true });

describe("Payments", () => {
  it("Fraud model scores transaction and auto-approves low-risk payment", async () => {
    await testFraudScore({ framework: "jest", runner: "node" });
  });
});
