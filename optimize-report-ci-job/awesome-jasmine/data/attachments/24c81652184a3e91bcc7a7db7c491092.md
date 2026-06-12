# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-features/browser-interaction.spec.ts >> Playwright · Browser interaction >> intercepts network request and validates mock response
- Location: suites/playwright-features/browser-interaction.spec.ts:39:7

# Error details

```
Error: page.evaluate: TypeError: Failed to execute 'fetch' on 'Window': Failed to parse URL from /api/status
    at eval (eval at evaluate (:302:30), <anonymous>:2:27)
    at UtilityScript.evaluate (<anonymous>:304:16)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```