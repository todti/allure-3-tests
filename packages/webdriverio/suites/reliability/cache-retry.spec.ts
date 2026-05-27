import { testCacheRetry } from "@allure-tests/shared";

describe("Reliability", () => {
  it("Distributed cache misses on cold start then recovers after retry", async () => {
    await testCacheRetry({ framework: "webdriverio", runner: "node" });
  });
});
