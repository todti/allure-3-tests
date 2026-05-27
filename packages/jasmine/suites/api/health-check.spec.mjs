import { describe, it } from "mocha";
import { testApiHealth } from "@allure-tests/shared";

describe("API", () => {
  it("Public API health endpoint responds with 200", async function () {
    this.timeout(30_000);
    await testApiHealth({ framework: "jasmine", runner: "node" });
  });
});
