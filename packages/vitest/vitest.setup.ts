import { afterEach, beforeEach } from "vitest";
import { runHookStyleAttachments } from "@allure-tests/shared";

beforeEach(async () => {
  await runHookStyleAttachments("before", true);
});

afterEach(async () => {
  await runHookStyleAttachments("after", true);
});
