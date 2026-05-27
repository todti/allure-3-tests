import { testAuditStatuses } from "@allure-tests/shared";

describe("Compliance", () => {
  it("Audit pipeline records passed, skipped, and broken steps", () => {
    cy.then(async () => {
      await testAuditStatuses({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});
