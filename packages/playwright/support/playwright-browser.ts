import { test, type Page } from "@playwright/test";
import type { ShowcaseContext } from "@allure-tests/shared";

type PlaywrightShowcaseExtras = Pick<ShowcaseContext, "attach" | "browser">;

export function playwrightShowcaseExtras(page: Page): PlaywrightShowcaseExtras {
  const attach: NonNullable<ShowcaseContext["attach"]> = async (name, body, contentType) => {
    await test.info().attach(name, { body, contentType });
  };

  return {
    attach,
    browser: {
      goto: (url) => page.goto(url),
      getTitle: () => page.title(),
    },
  };
}
