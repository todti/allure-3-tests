import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkFeatureLabels } from "@allure-tests/shared";

const ctx = { framework: "jest", runner: "node" };

describe("Jest · Mocks and spies", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it("tracks calls and return values with jest.fn()", async () => {
    await applyFrameworkFeatureLabels(ctx, "Mocks and spies", "jest.fn() call tracking");

    const paymentProcessor = jest.fn()
      .mockReturnValueOnce({ status: "approved", code: "00" })
      .mockReturnValueOnce({ status: "declined", code: "51" })
      .mockReturnValue({ status: "error", code: "99" });

    await allure.step("Make three processor calls", async () => {
      const r1 = paymentProcessor({ amount: 100, card: "4111" });
      const r2 = paymentProcessor({ amount: 200, card: "5555" });
      const r3 = paymentProcessor({ amount: 0 });

      await allure.attachment("call-1", JSON.stringify(r1), ContentType.JSON);
      await allure.attachment("call-2", JSON.stringify(r2), ContentType.JSON);
      await allure.attachment("call-3", JSON.stringify(r3), ContentType.JSON);
      await allure.parameter("total_calls", String(paymentProcessor.mock.calls.length));
    });

    await allure.step("Assert call history", async () => {
      expect(paymentProcessor).toHaveBeenCalledTimes(3);
      expect(paymentProcessor).toHaveBeenNthCalledWith(1, { amount: 100, card: "4111" });

      const allCalls = paymentProcessor.mock.calls.map((args) => JSON.stringify(args[0]));
      await allure.attachment("all-calls", allCalls.join("\n"), ContentType.TEXT);
    });
  });

  it("spies on object method without replacing implementation", async () => {
    await applyFrameworkFeatureLabels(ctx, "Mocks and spies", "jest.spyOn() method spy");

    const authService = {
      sign: (payload) => `signed:${JSON.stringify(payload)}`,
      verify: (token) => token.startsWith("signed:"),
    };

    const signSpy = jest.spyOn(authService, "sign");
    const verifySpy = jest.spyOn(authService, "verify");

    await allure.step("Invoke real implementation via spy", async () => {
      const token = authService.sign({ sub: "user-1", role: "admin" });
      const valid = authService.verify(token);

      await allure.parameter("token", token);
      await allure.parameter("valid", String(valid));
      await allure.attachment("spy-calls", JSON.stringify({
        sign: signSpy.mock.calls,
        verify: verifySpy.mock.calls,
      }, null, 2), ContentType.JSON);
    });

    await allure.step("Assert spy metadata", async () => {
      expect(signSpy).toHaveBeenCalledTimes(1);
      expect(verifySpy).toHaveBeenCalledTimes(1);
      expect(verifySpy).toHaveReturnedWith(true);
    });
  });

  it("overrides implementation with mockImplementation", async () => {
    await applyFrameworkFeatureLabels(ctx, "Mocks and spies", "mockImplementation override");

    const featureFlags = { isEnabled: (flag) => false };
    const flagSpy = jest.spyOn(featureFlags, "isEnabled").mockImplementation((flag) => {
      const overrides = { darkMode: true, betaCheckout: true };
      return overrides[flag] ?? false;
    });

    await allure.step("Check feature flags with override", async () => {
      const results = ["darkMode", "betaCheckout", "legacy", "unknown"].map((flag) => ({
        flag,
        enabled: featureFlags.isEnabled(flag),
      }));

      await allure.attachment("flag-results", JSON.stringify(results, null, 2), ContentType.JSON);
      expect(featureFlags.isEnabled("darkMode")).toBe(true);
      expect(featureFlags.isEnabled("legacy")).toBe(false);
    });

    await allure.step("Restore and verify real implementation", async () => {
      flagSpy.mockRestore();
      expect(featureFlags.isEnabled("darkMode")).toBe(false);
      await allure.attachment("restored", "real impl returns false for all flags", ContentType.TEXT);
    });
  });
});
