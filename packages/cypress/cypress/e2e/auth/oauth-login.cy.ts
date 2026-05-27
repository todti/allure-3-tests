import { testAuthLogin } from "@allure-tests/shared";

describe("Authentication", () => {
  it("OAuth login grants access token", () => {
    cy.then(async () => {
      await testAuthLogin({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});
