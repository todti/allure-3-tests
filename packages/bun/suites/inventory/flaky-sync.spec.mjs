import { describe, it } from "mocha";
import { testFlakyInventory } from "@allure-tests/shared";

describe("Inventory", function () {
  this.retries(2);

  it("Inventory shard lock causes intermittent sync failures", async function () {
    this.timeout(30_000);
    await testFlakyInventory({ framework: "bun", runner: "bun" }, { attempt: this.currentTest?.currentRetry() ?? 0 });
  });
});
