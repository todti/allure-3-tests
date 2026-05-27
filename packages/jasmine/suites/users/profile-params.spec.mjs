import { fileURLToPath } from "node:url";
import { testUserProfile } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "User profile stores masked and hidden parameters",
]);

describe("Users", () => {
  it("User profile stores masked and hidden parameters", async () => {
    await testUserProfile({ framework: "jasmine", runner: "node" });
  }, 30_000);
});
