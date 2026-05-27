import { fileURLToPath } from "node:url";
import { testAuthLogin } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "OAuth login grants access token",
]);

describe("Authentication", () => {
  it("OAuth login grants access token", async () => {
    await testAuthLogin({ framework: "jasmine", runner: "node" });
  }, 30_000);
});
