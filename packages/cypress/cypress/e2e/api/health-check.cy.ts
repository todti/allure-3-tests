import { testApiHealth } from "@allure-tests/shared/domains";

describe("API", () => {
  it("Public API health endpoint responds with 200", () => {
    cy.then(async () => {
      await testApiHealth({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});
