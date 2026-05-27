import { testCacheRetry } from "@allure-tests/shared";

Feature("Reliability");

Scenario("Distributed cache misses on cold start then recovers after retry", async () => {
  await testCacheRetry({ framework: "codeceptjs", runner: "node" });
});
