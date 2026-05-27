import { describe, it, jest } from "@jest/globals";
import { testApiHealth } from "@allure-tests/shared";

describe("API", () => {
  it("Public API health endpoint responds with 200", async () => {
    await testApiHealth({ framework: "jest", runner: "node" });
  });
});
