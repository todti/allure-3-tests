import { describe, it, jest } from "@jest/globals";
import { testCacheRetry } from "@allure-tests/shared";

jest.retryTimes(2, { logErrorsBeforeRetry: true });

describe("Reliability", () => {
  it("Distributed cache misses on cold start then recovers after retry", async () => {
    await testCacheRetry({ framework: "jest", runner: "node" });
  });
});
