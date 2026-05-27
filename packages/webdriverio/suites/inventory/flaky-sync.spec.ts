import { testFlakyInventory } from "@allure-tests/shared";

describe("Inventory", () => {
  it("Inventory shard lock causes intermittent sync failures", async () => {
    await testFlakyInventory({ framework: "webdriverio", runner: "node" });
  });
});
