import { afterEach, beforeEach, describe, it } from "mocha";
import {
  runAllureFeatureShowcase,
  runHookStyleAttachments,
} from "@allure-tests/shared";

describe("Allure 3 feature showcase (Bun + Mocha)", () => {
  beforeEach(async () => {
    await runHookStyleAttachments("before", true);
  });

  afterEach(async () => {
    await runHookStyleAttachments("after", true);
  });

  it("demonstrates Allure runtime API on Bun runtime", async function () {
    this.timeout(30_000);
    await runAllureFeatureShowcase({
      framework: "bun",
      runner: "bun",
    });
  });
});
