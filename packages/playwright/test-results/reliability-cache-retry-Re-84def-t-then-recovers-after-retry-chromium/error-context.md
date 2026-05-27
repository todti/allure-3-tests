# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: reliability/cache-retry.spec.ts >> Reliability >> Distributed cache misses on cold start then recovers after retry
- Location: suites/reliability/cache-retry.spec.ts:7:7

# Error details

```
Error: Cache miss on cold start (expected on first attempt)
```

# Test source

```ts
  1  | import * as allure from "allure-js-commons";
  2  | import { ContentType } from "allure-js-commons";
  3  | import { shouldSimulateTransientFailure } from "../flaky.js";
  4  | import { applyDomainLabels } from "../labels.js";
  5  | export async function testCacheRetry(ctx, hints = {}) {
  6  |     const attempt = hints.attempt ?? 0;
  7  |     const testId = `${ctx.framework}-cache-retry`;
  8  |     await applyDomainLabels(ctx, "cache-retry");
  9  |     await allure.displayName("Distributed cache misses on cold start then recovers after retry");
  10 |     await allure.testCaseId(testId);
  11 |     await allure.tag("retries");
  12 |     await allure.step("Read feature flag payload", async (step) => {
  13 |         await step.parameter("cache_key", "feature-flags:v3");
  14 |         await step.parameter("attempt", String(attempt + 1));
  15 |         if (shouldSimulateTransientFailure(testId, attempt, 2, 0)) {
> 16 |             throw new Error("Cache miss on cold start (expected on first attempt)");
     |                   ^ Error: Cache miss on cold start (expected on first attempt)
  17 |         }
  18 |         await allure.attachment("cache.state", "HIT", ContentType.TEXT);
  19 |     });
  20 | }
  21 | 
```