import { testCacheRetry } from "@allure-tests/shared";

describe("Reliability", () => {
  it("Distributed cache misses on cold start then recovers after retry", () => {
    cy.then(async () => {
      await testCacheRetry({ framework: "cypress", runner: "node", skipHttpSmoke: true });
    });
  });
});
