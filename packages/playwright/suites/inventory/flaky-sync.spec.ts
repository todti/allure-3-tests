import { test } from "@playwright/test";
import { testFlakyInventory } from "@allure-tests/shared";

test.describe("Inventory", () => {
    test.describe.configure({ retries: 2 });

  test("Inventory shard lock causes intermittent sync failures", async () => {
    await testFlakyInventory({ framework: "playwright", runner: "node" }, { attempt: test.info().retry });
  });
});
