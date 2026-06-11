import { testFraudScore } from "@allure-tests/shared/domains";

describe("Payments", () => {
  it("Fraud model scores transaction and auto-approves low-risk payment", () => {
    cy.then(async () => {
      await testFraudScore({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});
