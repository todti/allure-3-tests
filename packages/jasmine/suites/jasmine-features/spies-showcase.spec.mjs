import { fileURLToPath } from "node:url";
import { describe, it, registerSpecTitles } from "../../helpers/spec-api.mjs";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkFeatureLabels } from "@allure-tests/shared";

registerSpecTitles(fileURLToPath(import.meta.url), [
  "spyOn tracks calls without replacing implementation",
  "createSpyObj builds a full mock object",
  "spy callFake provides custom implementation",
]);

const ctx = { framework: "jasmine", runner: "node" };

describe("Jasmine · Spies and doubles", () => {
  it("spyOn tracks calls without replacing implementation", async () => {
    await applyFrameworkFeatureLabels(ctx, "Spies", "spyOn() call tracking");

    const cryptoService = {
      hash: (input) => `sha256:${Buffer.from(input).toString("base64").slice(0, 8)}`,
      compare: (input, hash) => cryptoService.hash(input) === hash,
    };

    const hashSpy = spyOn(cryptoService, "hash").and.callThrough();
    const compareSpy = spyOn(cryptoService, "compare").and.callThrough();

    await allure.step("Exercise crypto service", async () => {
      const h1 = cryptoService.hash("secret-password");
      const h2 = cryptoService.hash("other-password");
      const match = cryptoService.compare("secret-password", h1);
      const noMatch = cryptoService.compare("wrong", h1);

      await allure.attachment("hashes", JSON.stringify({ h1, h2, match, noMatch }, null, 2), ContentType.JSON);
      await allure.parameter("hash_calls", String(hashSpy.calls.count()));
      await allure.parameter("compare_calls", String(compareSpy.calls.count()));
    });

    await allure.step("Assert spy call counts and arguments", async () => {
      expect(hashSpy.calls.count()).toBe(3);
      expect(compareSpy.calls.count()).toBe(2);
      expect(hashSpy.calls.argsFor(0)).toEqual(["secret-password"]);

      const allArgs = hashSpy.calls.allArgs();
      await allure.attachment("spy-call-args", JSON.stringify(allArgs, null, 2), ContentType.JSON);
    });
  }, 30_000);

  it("createSpyObj builds a full mock object", async () => {
    await applyFrameworkFeatureLabels(ctx, "Spies", "jasmine.createSpyObj()");

    const emailClient = jasmine.createSpyObj("emailClient", ["send", "schedule", "getStatus"]);
    emailClient.send.and.returnValue({ id: "msg-001", queued: true });
    emailClient.schedule.and.returnValue({ id: "sched-001", sendAt: "2026-01-01T10:00:00Z" });
    emailClient.getStatus.and.returnValue({ id: "msg-001", status: "delivered" });

    await allure.step("Interact with email client spy", async () => {
      const sent = emailClient.send({ to: "user@example.com", subject: "Welcome" });
      const scheduled = emailClient.schedule({ to: "user@example.com", delay: "1h" });
      const status = emailClient.getStatus("msg-001");

      await allure.attachment("operations", JSON.stringify({ sent, scheduled, status }, null, 2), ContentType.JSON);
      expect(emailClient.send).toHaveBeenCalledTimes(1);
      expect(emailClient.schedule).toHaveBeenCalledTimes(1);
      expect(status.status).toBe("delivered");
    });
  }, 30_000);

  it("spy callFake provides custom implementation", async () => {
    await applyFrameworkFeatureLabels(ctx, "Spies", "callFake() custom implementation");

    const rng = { next: () => Math.random() };
    let callCount = 0;
    spyOn(rng, "next").and.callFake(() => {
      const sequence = [0.1, 0.5, 0.9, 0.3];
      return sequence[callCount++ % sequence.length];
    });

    await allure.step("Generate deterministic random sequence", async () => {
      const values = Array.from({ length: 6 }, () => rng.next());
      await allure.attachment("sequence", JSON.stringify(values, null, 2), ContentType.JSON);
      await allure.parameter("count", String(values.length));

      expect(values[0]).toBe(0.1);
      expect(values[1]).toBe(0.5);
      expect(values[4]).toBe(0.1);
    });
  }, 30_000);
});
