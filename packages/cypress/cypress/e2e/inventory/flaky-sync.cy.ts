import { testFlakyInventory } from "@allure-tests/shared/domains";

describe("Inventory", () => {
  it("Inventory shard lock causes intermittent sync failures", () => {
    cy.then(async () => {
      await testFlakyInventory({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});
