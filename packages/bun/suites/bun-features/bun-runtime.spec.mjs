import { describe, it } from "mocha";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkFeatureLabels } from "@allure-tests/shared";

const ctx = { framework: "bun", runner: "bun" };

describe("Bun · Runtime APIs", function () {
  this.timeout(30_000);

  it("exposes Bun.version and runtime metadata", async function () {
    await applyFrameworkFeatureLabels(ctx, "Runtime APIs", "Bun.version and globals");

    await allure.step("Collect runtime metadata", async () => {
      const runtime = typeof Bun !== "undefined"
        ? { runtime: "bun", version: Bun.version, revision: Bun.revision }
        : { runtime: "node", version: process.version };

      await allure.attachment("runtime-info", JSON.stringify(runtime, null, 2), ContentType.JSON);
      await allure.parameter("runtime", runtime.runtime);
      await allure.parameter("version", runtime.version);
    });
  });

  it("reads environment variables via process.env", async function () {
    await applyFrameworkFeatureLabels(ctx, "Runtime APIs", "Environment variable access");

    await allure.step("Enumerate selected env vars", async () => {
      const selected = ["NODE_ENV", "CI", "HOME", "PATH"].reduce((acc, key) => {
        const val = process.env[key];
        if (val !== undefined) acc[key] = val.slice(0, 60);
        return acc;
      }, {});

      await allure.attachment("env-vars", JSON.stringify(selected, null, 2), ContentType.JSON);
      await allure.parameter("env_keys", String(Object.keys(selected).length));
    });
  });

  it("uses native setTimeout resolved via Promise", async function () {
    await applyFrameworkFeatureLabels(ctx, "Runtime APIs", "Timer and async scheduling");

    await allure.step("Schedule and await delayed task", async () => {
      const start = performance.now();
      await new Promise((r) => setTimeout(r, 20));
      const elapsed = Math.round(performance.now() - start);

      await allure.parameter("elapsed_ms", String(elapsed));
      await allure.attachment("timing", `Resolved after ~${elapsed}ms (target: 20ms)`, ContentType.TEXT);

      if (elapsed < 10 || elapsed > 500) {
        throw new Error(`Unexpected elapsed time: ${elapsed}ms`);
      }
    });
  });
});
