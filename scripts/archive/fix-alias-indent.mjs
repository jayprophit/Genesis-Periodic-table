// One-off repair: sequence-item source_alias lines need continuation indent.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = join(import.meta.dirname, "..");
const p = join(root, "records/0001-Hydrogen-H/sources/0001-Hydrogen-H-Sources.yaml");
const t = readFileSync(p, "utf8").replace(/\r\n/g, "\n");
const fixed = t.replace(/^  - source_alias:/gm, "    source_alias:");
writeFileSync(p, fixed);
import YAML from "yaml";
YAML.parse(fixed);
console.log("repaired + parses OK");
