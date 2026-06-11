import { testFlakyInventory } from "@allure-tests/shared";

describe("Inventory", function () {
  it("Inventory shard lock causes intermittent sync failures", async function () {
    await testFlakyInventory(
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
