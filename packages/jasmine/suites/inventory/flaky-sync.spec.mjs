import { fileURLToPath } from "node:url";
import { testFlakyInventory } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Inventory shard lock causes intermittent sync failures",
]);

describe("Inventory", () => {
  it("Inventory shard lock causes intermittent sync failures", async () => {
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await testFlakyInventory({ framework: "jasmine", runner: "node" }, { attempt });
        return;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  }, 30_000);
});
