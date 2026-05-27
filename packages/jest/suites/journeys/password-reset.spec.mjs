import { describe, it } from "@jest/globals";
import { testPasswordReset } from "@allure-tests/shared";

describe("Customer journeys", () => {
  it("Password reset journey sends token and confirms delivery", async () => {
    await testPasswordReset({ framework: "jest", runner: "node" });
  });
});
