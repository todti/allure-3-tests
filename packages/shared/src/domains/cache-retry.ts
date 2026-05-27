import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { shouldSimulateTransientFailure } from "../flaky.js";
import { applyFrameworkLabels } from "../showcase.js";
import type { RuntimeHints, ShowcaseContext } from "../types.js";

export async function testCacheRetry(ctx: ShowcaseContext, hints: RuntimeHints = {}): Promise<void> {
  const attempt = hints.attempt ?? 0;
  const testId = `${ctx.framework}-cache-retry`;

  await applyFrameworkLabels(ctx);
  await allure.displayName("Distributed cache misses on cold start then recovers after retry");
  await allure.testCaseId(testId);
  await allure.epic("Platform");
  await allure.feature("Caching");
  await allure.story("Warmup retries");
  await allure.tag("retries");

  await allure.step("Read feature flag payload", async (step) => {
    await step.parameter("cache_key", "feature-flags:v3");
    await step.parameter("attempt", String(attempt + 1));

    if (shouldSimulateTransientFailure(testId, attempt, 2, 0)) {
      throw new Error("Cache miss on cold start (expected on first attempt)");
    }

    await allure.attachment("cache.state", "HIT", ContentType.TEXT);
  });
}
