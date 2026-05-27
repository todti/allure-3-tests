import { describe, it, jest } from "@jest/globals";
import { testFlakyPayment } from "@allure-tests/shared";

jest.retryTimes(2, { logErrorsBeforeRetry: true });

describe("Payments", () => {
  it("Payment gateway may timeout before authorization", async () => {
    await testFlakyPayment({ framework: "jest", runner: "node" });
  });
});
