// Full MAT integrity suite. Run: npm run validate
import { spawnSync } from "node:child_process";

const suites = [
  "scripts/validate-records.mjs",
  "scripts/validate-sources.mjs",
  "scripts/validate-relationships.mjs",
  "scripts/validate-assets.mjs",
  "scripts/check-links.mjs",
  "scripts/check-identifiers.mjs",
  "scripts/check-book-sync.mjs",
];
let failed = 0;
for (const s of suites) {
  console.log(`\n===== ${s} =====`);
  const r = spawnSync(process.execPath, [s], { stdio: "inherit" });
  if (r.status !== 0) failed++;
}
console.log(failed ? `\nVALIDATE: ${failed} suite(s) failing` : "\nVALIDATE: all suites pass");
process.exitCode = failed ? 1 : 0;
