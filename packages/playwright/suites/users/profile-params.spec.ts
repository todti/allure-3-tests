import { test } from "@playwright/test";
import { testUserProfile } from "@allure-tests/shared";

test.describe("Users", () => {
  test("User profile stores masked and hidden parameters", async ({}) => {
    await testUserProfile({ framework: "playwright", runner: "node" });
  });
});
