import { testFlakyInventory } from "@allure-tests/shared";

Feature("Inventory");

Scenario("Inventory shard lock causes intermittent sync failures", async () => {
  await testFlakyInventory({ framework: "codeceptjs", runner: "node" });
});
