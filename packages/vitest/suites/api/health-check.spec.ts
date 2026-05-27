import { describe, it } from "vitest";
import { testApiHealth } from "@allure-tests/shared";

describe("API", () => {
  it("Public API health endpoint responds with 200", async () => {
    await testApiHealth({ framework: "vitest", runner: "node" });
  }, 30_000);
});
