import { describe, it } from "mocha";
import { testUserProfile } from "@allure-tests/shared";

describe("Users", () => {
  it("User profile stores masked and hidden parameters", async function () {
    this.timeout(30_000);
    await testUserProfile({ framework: "mocha", runner: "node" });
  });
});
