import { testSettlementReport } from "@allure-tests/shared/domains";

describe("Payments", () => {
  it("Daily settlement report is generated and submitted to acquiring bank", () => {
    cy.then(async () => {
      await testSettlementReport({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});
