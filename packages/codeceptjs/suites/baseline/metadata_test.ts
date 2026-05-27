import { testMetadataShowcase } from "@allure-tests/shared";

Feature("Adapter parity");

Scenario("Allure metadata baseline documents runtime API surface", async () => {
  await testMetadataShowcase({ framework: "codeceptjs", runner: "node" });
});
