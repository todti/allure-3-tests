import { testMetadataShowcase } from "@allure-tests/shared";

describe("Adapter parity", () => {
  it("Allure metadata baseline documents runtime API surface", () => {
    cy.then(async () => {
      await testMetadataShowcase({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});
