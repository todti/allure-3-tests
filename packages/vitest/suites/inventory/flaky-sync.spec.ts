import { describe, it } from "vitest";
import { testFlakyInventory } from "@allure-tests/shared";

describe("Inventory", () => {
  it("Inventory shard lock causes intermittent sync failures", async () => {
    await testFlakyInventory({ framework: "vitest", runner: "node" });
  }, { timeout: 30_000, retry: 2 });
});
