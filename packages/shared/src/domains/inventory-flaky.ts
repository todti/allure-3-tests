import * as allure from "allure-js-commons";
import { Status } from "allure-js-commons";
import { shouldSimulateTransientFailure } from "../flaky.js";
import { applyFrameworkLabels } from "../showcase.js";
import type { RuntimeHints, ShowcaseContext } from "../types.js";

export async function testFlakyInventory(
  ctx: ShowcaseContext,
  hints: RuntimeHints = {},
): Promise<void> {
  const attempt = hints.attempt ?? 0;
  const testId = `${ctx.framework}-inventory-sync`;

  await applyFrameworkLabels(ctx);
  await allure.displayName("Inventory shard lock causes intermittent sync failures");
  await allure.testCaseId(testId);
  await allure.epic("Warehouse");
  await allure.feature("Inventory");
  await allure.story("Stock synchronization");
  await allure.tag("flaky");
  await allure.tag("inventory");

  await allure.step("Pull warehouse deltas", async (step) => {
    await step.parameter("warehouse_id", "wh-eu-1");
    await step.parameter("attempt", String(attempt + 1));

    if (shouldSimulateTransientFailure(testId, attempt, 1, 0.35)) {
      throw new Error("Inventory shard lock contention (simulated)");
    }

    await allure.logStep("Inventory synchronized", Status.PASSED);
  });
}
