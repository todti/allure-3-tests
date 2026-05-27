import { describe, it } from "@jest/globals";
import { testFlakyInventory } from "@allure-tests/shared";

jest.retryTimes(2, { logErrorsBeforeRetry: true });

describe("Inventory", () => {
  it("Inventory shard lock causes intermittent sync failures", async () => {
    await testFlakyInventory({ framework: "jest", runner: "node" });
  });
});
