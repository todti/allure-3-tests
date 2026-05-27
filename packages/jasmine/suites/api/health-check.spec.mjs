import { fileURLToPath } from "node:url";
import { testApiHealth } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Public API health endpoint responds with 200",
]);

describe("API", () => {
  it("Public API health endpoint responds with 200", async () => {
    await testApiHealth({ framework: "jasmine", runner: "node" });
  }, 30_000);
});
