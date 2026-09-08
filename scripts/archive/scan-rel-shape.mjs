import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import YAML from "yaml";
const files = execSync('git ls-files "records/*elationship*.yaml"').toString().trim().split("\n");
for (const f of files) {
  try {
    const d = YAML.parse(readFileSync(f, "utf8"));
    if (d && d.relationships && !Array.isArray(d.relationships)) console.log("MAP:", f);
  } catch (e) { console.log("PARSE-FAIL:", f, e.message.split("\n")[0]); }
}
