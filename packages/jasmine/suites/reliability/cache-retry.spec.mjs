import { fileURLToPath } from "node:url";
import { testCacheRetry } from "@allure-tests/shared";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "Distributed cache misses on cold start then recovers after retry",
]);

describe("Reliability", () => {
  it("Distributed cache misses on cold start then recovers after retry", async () => {
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await testCacheRetry({ framework: "jasmine", runner: "node" }, { attempt });
        return;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  }, 30_000);
});
