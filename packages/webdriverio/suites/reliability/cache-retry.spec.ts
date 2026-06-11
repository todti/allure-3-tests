import { testCacheRetry } from "@allure-tests/shared";

describe("Reliability", function () {
  it("Distributed cache misses on cold start then recovers after retry", async function () {
    await testCacheRetry(
      {
        framework: "webdriverio",
        runner: "node",
        browser: {
          goto: (url) => browser.url(url),
          getTitle: () => browser.getTitle(),
        },
      },
      { attempt: this.currentTest?.currentRetry() ?? 0 },
    );
  });
});
