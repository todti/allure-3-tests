import { describe, it } from "mocha";
import { testPasswordReset } from "@allure-tests/shared";

describe("Customer journeys", () => {
  it("Password reset journey sends token and confirms delivery", async function () {
    this.timeout(30_000);
    await testPasswordReset({ framework: "mocha", runner: "node" });
  });
});
