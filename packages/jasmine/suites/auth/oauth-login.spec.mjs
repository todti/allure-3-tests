import { describe, it } from "mocha";
import { testAuthLogin } from "@allure-tests/shared";

describe("Authentication", () => {
  it("OAuth login grants access token", async function () {
    this.timeout(30_000);
    await testAuthLogin({ framework: "jasmine", runner: "node" });
  });
});
