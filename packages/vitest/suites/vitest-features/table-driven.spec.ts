import { describe, it, expect, vi } from "vitest";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkFeatureLabels } from "@allure-tests/shared";

const ctx = { framework: "vitest", runner: "node" };

describe("Vitest · Table-driven and concurrent tests", () => {
  it.each([
    { card: "visa",       prefix: "4",   minLen: 13, maxLen: 16 },
    { card: "mastercard", prefix: "5",   minLen: 16, maxLen: 16 },
    { card: "amex",       prefix: "37",  minLen: 15, maxLen: 15 },
    { card: "discover",   prefix: "6011",minLen: 16, maxLen: 19 },
  ])("validates $card card prefix and length", async ({ card, prefix, minLen, maxLen }) => {
    await applyFrameworkFeatureLabels(ctx, "Parameterized tests", `Card validation – ${card}`);
    await allure.parameter("card_type", card);
    await allure.parameter("expected_prefix", prefix);
    await allure.parameter("min_length", String(minLen));
    await allure.parameter("max_length", String(maxLen));

    const validateCard = (number: string) => ({
      prefixOk: number.startsWith(prefix),
      lengthOk: number.length >= minLen && number.length <= maxLen,
    });

    await allure.step(`Generate and validate sample ${card} number`, async () => {
      const sample = prefix + "0".repeat(minLen - prefix.length);
      const result = validateCard(sample);
      await allure.attachment("validation-result", JSON.stringify({ sample, ...result }, null, 2), ContentType.JSON);
      expect(result.prefixOk).toBe(true);
      expect(result.lengthOk).toBe(true);
    });
  });

  it("runs concurrent sub-operations and collects results", async () => {
    await applyFrameworkFeatureLabels(ctx, "Concurrent tests", "Promise.all parallel execution");

    const services = ["auth", "catalog", "payments", "notifications", "analytics"];

    await allure.step("Health-check services concurrently", async () => {
      const checkService = vi.fn(async (name: string) => {
        await new Promise((r) => setTimeout(r, Math.random() * 20));
        return { service: name, status: "healthy", latency_ms: Math.floor(Math.random() * 50) + 5 };
      });

      const results = await Promise.all(services.map(checkService));
      await allure.attachment("health-results", JSON.stringify(results, null, 2), ContentType.JSON);
      await allure.parameter("services_checked", String(results.length));

      results.forEach((r) => expect(r.status).toBe("healthy"));
    });
  });

  it("mocks module with vi.fn() and verifies call order", async () => {
    await applyFrameworkFeatureLabels(ctx, "Mocks", "vi.fn() call order");

    const logger = {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    await allure.step("Simulate a request lifecycle", async () => {
      logger.info("request.start", { method: "POST", path: "/checkout" });
      logger.warn("validation.slow", { duration_ms: 250 });
      logger.info("payment.charged", { amount: 49.99 });
      logger.info("request.end", { status: 200 });

      await allure.attachment("info-calls", JSON.stringify(logger.info.mock.calls, null, 2), ContentType.JSON);
      await allure.attachment("warn-calls", JSON.stringify(logger.warn.mock.calls, null, 2), ContentType.JSON);
      await allure.parameter("info_count", String(logger.info.mock.calls.length));
      await allure.parameter("warn_count", String(logger.warn.mock.calls.length));

      expect(logger.info).toHaveBeenCalledTimes(3);
      expect(logger.warn).toHaveBeenCalledTimes(1);
      expect(logger.error).not.toHaveBeenCalled();
    });
  });
});
