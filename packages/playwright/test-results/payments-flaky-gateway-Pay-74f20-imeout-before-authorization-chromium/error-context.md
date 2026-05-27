# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: payments/flaky-gateway.spec.ts >> Payments >> Payment gateway may timeout before authorization
- Location: suites/payments/flaky-gateway.spec.ts:7:7

# Error details

```
Error: Payment gateway timeout (simulated flaky failure)
```

# Test source

```ts
  1  | import * as allure from "allure-js-commons";
  2  | import { ContentType } from "allure-js-commons";
  3  | import { shouldSimulateTransientFailure } from "../flaky.js";
  4  | import { applyDomainLabels } from "../labels.js";
  5  | export async function testFlakyPayment(ctx, hints = {}) {
  6  |     const attempt = hints.attempt ?? 0;
  7  |     const testId = `${ctx.framework}-payment-gateway`;
  8  |     await applyDomainLabels(ctx, "payment-flaky");
  9  |     await allure.displayName("Payment gateway may timeout before authorization");
  10 |     await allure.testCaseId(testId);
  11 |     await allure.tag("flaky");
  12 |     await allure.severity("critical");
  13 |     await allure.step("Submit card payment", async (step) => {
  14 |         await step.parameter("attempt", String(attempt + 1));
  15 |         await step.parameter("merchant", "demo-store");
  16 |         await step.parameter("amount", "129.99");
  17 |         if (shouldSimulateTransientFailure(testId, attempt, 2, 0.25)) {
  18 |             await allure.attachment("gateway.log", "HTTP 503 upstream timeout", ContentType.TEXT);
> 19 |             throw new Error("Payment gateway timeout (simulated flaky failure)");
     |                   ^ Error: Payment gateway timeout (simulated flaky failure)
  20 |         }
  21 |         await allure.attachment("receipt", JSON.stringify({ authorization: "AUTH-OK" }), ContentType.JSON);
  22 |     });
  23 | }
  24 | 
```