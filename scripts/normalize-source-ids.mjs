// Normalize historical source aliases to canonical IDs in record data,
// retaining the alias as source_alias. Only mappings present in the global
// registry are applied. Run: node scripts/normalize-source-ids.mjs [recordDir]
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import YAML from "yaml";

const root = join(import.meta.dirname, "..");
const target = process.argv[2] || "records/0001-Hydrogen-H";
const reg = YAML.parse(readFileSync(join(root, "data/registries/sources.yaml"), "utf8"));
const aliasToCanon = new Map();
for (const s of reg.sources || []) for (const a of s.source_aliases || []) aliasToCanon.set(a, s.source_id);

function files(dir) {
  const out = [];
  for (const en of readdirSync(dir)) {
    const p = join(dir, en);
    if (statSync(p).isDirectory()) out.push(...files(p));
    else if (en.endsWith(".yaml") || en.endsWith(".yml")) out.push(p);
  }
  return out;
}
let changed = 0, reps = 0;
for (const f of files(join(root, target))) {
  let t = readFileSync(f, "utf8").replace(/\r\n/g, "\n");
  const orig = t;
  // source_id: "ALIAS" (or "- source_id: ...") -> canonical + source_alias.
  // Same-indent alias line; skip when the alias line already follows.
  const lines = t.split("\n");
  const out = [];
  for (let k = 0; k < lines.length; k++) {
    const m = lines[k].match(/^([ \t]*(?:-[ \t]*)?)source_id:\s*"([^"]+)"[ \t]*$/);
    const c = m && aliasToCanon.get(m[2]);
    if (m && c && c !== m[2] && !(lines[k + 1] || "").match(/source_alias:/)) {
      // Sequence items ("- source_id:") take a deeper continuation indent.
      const cont = m[1].replace("-", " ");
      out.push(`${m[1]}source_id: "${c}"`);
      out.push(`${cont}source_alias: "${m[2]}"`);
      changed++;
    } else out.push(lines[k]);
  }
  t = out.join("\n");
  // list items: - "ALIAS" -> - "CANON"
  t = t.replace(/^([ \t]*-[ \t]*)"([^"]+"?)$/gm, (m, pre, vq) => {
    const v = vq.replace(/"$/, "");
    const c = aliasToCanon.get(v);
    if (!c || c === v) return m;
    reps++;
    return `${pre}"${c}"`;
  });
  if (t !== orig) { writeFileSync(f, t); console.log("normalized", f.replace(root, "")); }
}
console.log(`done: ${changed} source_id fields, ${reps} list items`);
