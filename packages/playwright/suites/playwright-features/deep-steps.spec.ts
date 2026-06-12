import { test } from "@playwright/test";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkFeatureLabels } from "@allure-tests/shared";

const ctx = { framework: "playwright", runner: "node" } as const;

test.describe("Playwright · Deep step nesting", () => {
  test("records 4-level allure.step + test.step hierarchy with parallel branches", async () => {
    await applyFrameworkFeatureLabels(ctx, "Step nesting", "Deep async steps");

    await test.step("L1: Initialize context", async () => {
      await allure.attachment("context", JSON.stringify({ env: "test", runner: "playwright" }, null, 2), ContentType.JSON);

      await allure.step("L2: Validate environment", async () => {
        await allure.step("L3: Check Node version", async () => {
          await allure.attachment("node-version", process.version, ContentType.TEXT);

          await allure.step("L4: Verify runtime constraints", async () => {
            await allure.parameter("min_version", "v18");
            await allure.parameter("actual", process.version);
            await allure.attachment("constraint-check", "passed", ContentType.TEXT);
          });
        });

        await allure.step("L3: Check platform", async () => {
          await allure.parameter("platform", process.platform);
          await allure.attachment("platform", process.platform, ContentType.TEXT);
        });
      });

      await allure.step("L2: Build mock dataset", async () => {
        const data = Array.from({ length: 5 }, (_, i) => ({ id: i + 1, value: `record-${i + 1}` }));
        await allure.attachment("mock-data", JSON.stringify(data, null, 2), ContentType.JSON);
      });
    });

    await test.step("L1: Execute parallel branches", async () => {
      await allure.step("L2: Parallel async work", async () => {
        const results = await Promise.all([
          (async () => {
            await allure.step("Branch A – auth token", async () => {
              await allure.attachment("token", "bearer.abc123", ContentType.TEXT);
            });
            return "auth-ok";
          })(),
          (async () => {
            await allure.step("Branch B – feature flags", async () => {
              await allure.attachment("flags", JSON.stringify({ darkMode: true, beta: false }), ContentType.JSON);
            });
            return "flags-ok";
          })(),
        ]);
        await allure.attachment("parallel-results", results.join(", "), ContentType.TEXT);
      });
    });

    await test.step("L1: Teardown", async () => {
      await allure.step("L2: Flush metrics", async () => {
        await allure.attachment("metrics", JSON.stringify({ steps: 12, duration_ms: 42 }), ContentType.JSON);
      });
    });
  });
});
