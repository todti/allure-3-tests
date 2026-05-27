import { test } from "@playwright/test";
import { testCacheRetry } from "@allure-tests/shared";

test.describe("Reliability", () => {
    test.describe.configure({ retries: 2 });

  test("Distributed cache misses on cold start then recovers after retry", async () => {
    await testCacheRetry({ framework: "playwright", runner: "node" }, { attempt: test.info().retry });
  });
});
