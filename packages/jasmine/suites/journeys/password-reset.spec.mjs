import { fileURLToPath } from "node:url";
import { testPasswordReset } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Password reset journey sends token and confirms delivery",
]);

describe("Customer journeys", () => {
  it("Password reset journey sends token and confirms delivery", async () => {
    await testPasswordReset({ framework: "jasmine", runner: "node" });
  }, 30_000);
});
