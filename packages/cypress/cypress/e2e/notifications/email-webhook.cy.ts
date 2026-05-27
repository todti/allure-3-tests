import { testEmailWebhook } from "@allure-tests/shared/domains";

describe("Notifications", () => {
  it("Email provider webhook fan-out completes asynchronously", () => {
    cy.then(async () => {
      await testEmailWebhook({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});
