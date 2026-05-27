import { fileURLToPath } from "node:url";
import { testEmailWebhook } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Email provider webhook fan-out completes asynchronously",
]);

describe("Notifications", () => {
  it("Email provider webhook fan-out completes asynchronously", async () => {
    await testEmailWebhook({ framework: "jasmine", runner: "node" });
  }, 30_000);
});
