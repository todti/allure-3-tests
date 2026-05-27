import { glob } from "glob";
import Mocha from "mocha";
import * as os from "node:os";

const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

const mocha = new Mocha({
  reporter: "allure-mocha",
  reporterOptions: {
    resultsDir,
    environmentInfo: {
      framework: "bun",
      runner: "bun",
      runtime_version: typeof Bun !== "undefined" ? Bun.version : "unknown",
      os_platform: os.platform(),
    },
  },
});

for (const file of glob.sync("suites/**/*.spec.mjs")) {
  mocha.addFile(file);
}

await mocha.loadFilesAsync();
mocha.run((failures) => process.exit(failures ? 1 : 0));
