import { describe, it } from "mocha";
import { testCacheRetry } from "@allure-tests/shared";

describe("Reliability", function () {
  this.retries(2);

  it("Distributed cache misses on cold start then recovers after retry", async function () {
    this.timeout(30_000);
    await testCacheRetry({ framework: "bun", runner: "bun" }, { attempt: this.currentTest?.currentRetry() ?? 0 });
  });
});
