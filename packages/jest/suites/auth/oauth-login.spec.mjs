import { describe, it, jest } from "@jest/globals";
import { testAuthLogin } from "@allure-tests/shared";

describe("Authentication", () => {
  it("OAuth login grants access token", async () => {
    await testAuthLogin({ framework: "jest", runner: "node" });
  });
});
