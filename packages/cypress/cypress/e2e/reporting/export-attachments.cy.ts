import { testExportAttachments } from "@allure-tests/shared/domains";

describe("Reporting", () => {
  it("Reporting export bundles multiple attachment formats", () => {
    cy.then(async () => {
      await testExportAttachments({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});
