import { testKnownRegression } from "@allure-tests/shared";

describe("Analytics", () => {
  it("Known regression remains red for dashboard analytics", () => {
    cy.then(async () => {
      await testKnownRegression({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});
