import { readFileSync, writeFileSync } from "node:fs";
import YAML from "yaml";
const p = process.argv[2] || "data/registries/sources.yaml";
const lines = readFileSync(p, "utf8").replace(/\r\n/g, "\n").split("\n");
// Lines (1-indexed): block 1177..2431 are source entries stranded after the
// tail status keys; move them back into the sources list (before line 1131).
const block = lines.slice(1176, 2431);
if (!block[0].match(/^  - source_id: "SRC-000091"/)) throw new Error("unexpected block start: " + block[0]);
const head = lines.slice(0, 1130);
if (!head[head.length - 1].match(/^      - /)) throw new Error("expected last sources item, got: " + head[head.length - 1]);
const tail = lines.slice(1130, 1176);
if (!tail[0].match(/^status:/)) throw new Error("expected status at 1131, got: " + tail[0]);
const last = block[block.length - 1];
const doc = head.concat(block, tail, lines.slice(2431)).join("\n");
const parsed = YAML.parse(doc);
const ids = parsed.sources.map((s) => s.source_id);
console.log("sources:", ids.length, "first:", ids[0], "last:", ids[ids.length - 1]);
console.log("has 091:", ids.includes("SRC-000091"), "rules:", JSON.stringify(parsed.rules));
writeFileSync(p + ".fixed", doc);
console.log("wrote", p + ".fixed");
