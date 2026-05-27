import { glob } from "glob";
import Mocha from "mocha";
import { buildEnvironmentInfo, runGlobalSetupFiles, runGlobalTeardownFiles } from "@allure-tests/shared";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

runGlobalSetupFiles({ framework: "bun" });

const mocha = new Mocha({
  reporter: "allure-mocha",
  retries: 2,
  reporterOptions: {
    resultsDir,
    environmentInfo: buildEnvironmentInfo("bun", {
      Runner: "bun",
      Runtime: typeof Bun !== "undefined" ? Bun.version : "unknown",
    }),
  },
});

mocha.addFile(new URL("./hooks/globals.mjs", import.meta.url).pathname);

for (const file of glob.sync("suites/**/*.spec.mjs")) {
  mocha.addFile(file);
}

await mocha.loadFilesAsync();
mocha.run((failures) => {
  runGlobalTeardownFiles({ framework: "bun" });
  process.exit(failures ? 1 : 0);
});
