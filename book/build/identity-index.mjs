// Elements + identities from record front-matter (record values only).
// Writes book/elements.json and book/identities.json.
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { root, writeJson, readText } from "./lib.mjs";

function count(dir, sub, test) {
  try {
    let n = 0;
    const walk = (d) => {
      for (const en of readdirSync(d)) {
        const p = join(d, en);
        if (statSync(p).isDirectory()) walk(p);
        else if (test(en)) n++;
      }
    };
    walk(join(root, "records", dir, sub));
    return n;
  } catch { return 0; }
}

export function buildIdentityIndex() {
  const elements = [], identities = {};
  const recDirs = readdirSync(join(root, "records")).filter((e) =>
    /^\d{4}-/.test(e) && statSync(join(root, "records", e)).isDirectory()).sort();
  for (const e of recDirs) {
    const m = e.match(/^(\d{4})-([A-Za-z-]+?)-([A-Za-z0-9]+)$/);
    if (!m) continue;
    const chapter = `records/${e}/${e}.md`;
    let fm = {}, src = "";
    try {
      src = readText(chapter);
      const fenceIdx = src.indexOf("```yaml");
      const headIdx = src.search(/^# /m);
      let block = "";
      if (fenceIdx !== -1 && (headIdx === -1 || fenceIdx < headIdx || src.slice(headIdx, fenceIdx).trim().split('\n').length === 1)) {
        const fence = src.match(/```yaml\n([\s\S]*?)\n```/);
        block = fence ? fence[1] : "";
      }
      if (!block) {
        const m2 = src.match(/^#[^\n]*\n([\s\S]*?)(?=^# |\Z)/m);
        block = m2 ? m2[1] : "";
      }
      if (block) for (const lm of block.matchAll(/^([a-z_]+):\s*(.+?)\s*$/gm)) {
        const v = lm[2].replace(/^"|"$/g, "").trim();
        if (v && !/^null$/i.test(v)) fm[lm[1]] = v;
      }
      for (const k of ["migration_status", "scientific_core", "completeness"]) {
        if (!fm[k]) {
          const hm = src.match(new RegExp("^" + k + ':\\s*"?([A-Za-z-]+)"?', "m"));
          if (hm) fm[k] = hm[1];
        }
      }
    } catch { continue; }
    const number = m[1];
    const name = (fm.record_name || m[2].replace(/-/g, " ")).trim();
    const symbol = (fm.symbol || (number === "0000" ? "OS" : m[3])).trim();
    const z = fm.atomic_number && /^\d+$/.test(fm.atomic_number) ? parseInt(fm.atomic_number, 10) : null;
    elements.push({ number, name, symbol, z, chapter });
    identities[number] = {
      number, name, symbol, z,
      record_class: fm.record_class || null,
      status: fm.status || fm.completeness || null,
      migration: fm.migration_status || null,
      scientific_core: null,
      weight: fm.standard_atomic_weight || fm.atomic_weight || null,
      tables: count(e, "tables", (f) => f.endsWith(".md")),
      graphs: count(e, "graphs", (f) => f.endsWith(".svg")),
      models: count(e, "models", (f) => f.endsWith(".glb")),
      calculations: count(e, "calculations", (f) => f.endsWith(".md")),
      sources: count(e, "sources", (f) => f.endsWith(".md") || f.endsWith(".yaml")),
    };
  }
  writeJson("elements.json", { elements }, 1);
  writeJson("identities.json", { identities }, 1);
  console.log(`elements: ${elements.length} + identities -> book/elements.json, book/identities.json`);
}
