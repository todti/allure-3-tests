import { describe, it } from "vitest";
import { testUserProfile } from "@allure-tests/shared";

describe("Users", () => {
  it("User profile stores masked and hidden parameters", async () => {
    await testUserProfile({ framework: "vitest", runner: "node" });
  }, 30_000);
});
