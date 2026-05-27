import { runAllureFeatureShowcase } from "@allure-tests/shared";

describe("Allure 3 feature showcase (Cypress)", () => {
  it("demonstrates Allure runtime API with Cypress", () => {
    cy.then(async () => {
      await runAllureFeatureShowcase({
        framework: "cypress",
        runner: "node",
        skipHttpSmoke: true,
      });
    });

    cy.visit("/");
    cy.title().should("include", "Playwright");
  });
});
