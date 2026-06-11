import { testCardTokenization } from "@allure-tests/shared";

Feature("Payments");

Scenario("Card number is tokenized via PCI vault", async () => {
  await testCardTokenization({ framework: "codeceptjs", runner: "node" });
});
