import { describe, it } from "vitest";
import { testAuthLogin } from "@allure-tests/shared";

describe("Authentication", () => {
  it("OAuth login grants access token", async () => {
    await testAuthLogin({ framework: "vitest", runner: "node" });
  }, 30_000);
});
