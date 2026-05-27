import { describe, it } from "vitest";
import { testCacheRetry } from "@allure-tests/shared";

describe("Reliability", () => {
  it("Distributed cache misses on cold start then recovers after retry", async () => {
    await testCacheRetry({ framework: "vitest", runner: "node" });
  }, { timeout: 30_000, retry: 2 });
});
