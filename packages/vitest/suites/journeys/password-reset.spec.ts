import { describe, it } from "vitest";
import { testPasswordReset } from "@allure-tests/shared";

describe("Customer journeys", () => {
  it("Password reset journey sends token and confirms delivery", async () => {
    await testPasswordReset({ framework: "vitest", runner: "node" });
  }, 30_000);
});
