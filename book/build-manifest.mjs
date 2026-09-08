import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = join(import.meta.dirname, "..");
const out = join(import.meta.dirname, "manifest.json");

function titleOf(file, fallback) {
  try {
    const text = readFileSync(file, "utf8");
    const m = text.match(/^#{1,3}\s+(.+?)\s*$/m);
    if (m) return m[1].replace(/[*_`]/g, "").slice(0, 90);
  } catch {}
  return fallback;
}

function mdFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...mdFiles(p));
    else if (e.endsWith(".md")) out.push(p);
  }
  return out.sort();
}

const chapters = [];
function addSection(label, files, base = "") {
  if (!files.length) return;
  chapters.push({ section: label, items: [] });
  const sec = chapters[chapters.length - 1];
  for (const f of files) {
    const rel = relative(root, f).split(sep).join("/");
    const name = f.split(sep).pop().replace(/\.md$/, "");
    sec.items.push({ id: rel, title: titleOf(f, name), path: "../" + rel });
  }
}

const docs = (d) => mdFiles(join(root, "docs", d));
addSection("Start here", [join(root, "README.md")]);
addSection("Front matter", docs("00-front-matter"));
addSection("Foundations", mdFiles(join(root, "docs", "01-foundations")));
addSection("Data", mdFiles(join(root, "docs", "02-data")));
addSection("Methodology", docs("03-methodology"));
addSection("Visualization", docs("04-visualization"));
addSection("Index", docs("05-index"));
addSection("Governance", docs("06-governance"));
addSection("Migration", docs("07-migration"));
addSection("Back matter", docs("08-back-matter"));
addSection("Material Atlas Table", mdFiles(join(root, "records")));

writeFileSync(out, JSON.stringify({ title: "Materials Atlas Table Codex", chapters }, null, 2));
const n = chapters.reduce((a, c) => a + c.items.length, 0);
console.log(`manifest: ${chapters.length} sections, ${n} chapters -> book/manifest.json`);

// ---- full-text search index + related-chapter graph (from the book's own data) ----
const flat = [];
chapters.forEach((sec) => sec.items.forEach((it) => flat.push({ ...it, section: sec.section })));
function stripMd(t) {
  return t
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`|$-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
const sdocs = flat.map((c, i) => {
  let full = "";
  try {
    full = stripMd(readFileSync(join(root, c.id), "utf8"));
  } catch {}
  const text = full.slice(0, 4000);
  // Identifiers live in front-matter/code fences too — extract from raw text.
  const refs = new Set();
  try {
    const raw = readFileSync(join(root, c.id), "utf8");
    for (const m of raw.matchAll(/MAT:(0\d{3})/g)) refs.add(m[1]);
  } catch {}
  // dataset alias grouping: records/NNNN-Name-Symbol/... -> ["nnnn","name","symbol"]
  // generic: derived from the folder name so every record (present + future) groups.
  let dataset = null, aks = [];
  const rm = c.id.match(/^records\/(\d{4})-([A-Za-z]+)-([A-Za-z0-9]+)\//);
  if (rm) {
    dataset = `${rm[1]} ${rm[2]}`;
    aks = [rm[1], rm[1].replace(/^0+/, "") || "0", rm[2].toLowerCase(), rm[3].toLowerCase()];
  }
  const dois = new Set();
  try {
    const raw = readFileSync(join(root, c.id), "utf8");
    for (const m of raw.matchAll(/10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+/g)) dois.add(m[0].replace(/[).,;]+$/, ""));
  } catch {}
  // Evidence lane from location + topic: records/docs default to core;
  // author-hypothesis, historical and claims material is labelled, never merged.
  let lane = "core";
  const lid = c.id.toLowerCase();
  if (/causali-e|claims|historical|alternative|unconventional/.test(lid)) lane = "claims";
  else if (/experiments\/|emerging|prediction|hypothes|proposed|speculative/.test(lid)) lane = "research";
  return { i, id: c.id, path: c.path, title: c.title, section: c.section, lane, text, refs: [...refs], dataset, aks: [...new Set(aks)], dois: [...dois].slice(0, 6) };
});
// related[i] = chapters sharing a MAT:NNNN record reference with i
const byRec = {};
sdocs.forEach((d) => d.refs.forEach((r) => ((byRec[r] ??= new Set()).add(d.i))));
const related = sdocs.map((d) => {
  const s = new Set();
  d.refs.forEach((r) => byRec[r].forEach((j) => { if (j !== d.i) s.add(j); }));
  return [...s].slice(0, 8);
});
writeFileSync(join(import.meta.dirname, "search-index.json"), JSON.stringify({ docs: sdocs, related }));
console.log(`search index: ${sdocs.length} docs -> book/search-index.json`);

// ---- visuals index: GENERATED record assets render as an in-chapter gallery;
// pending slots (SOURCE-IMAGE-REQUIRED / DATASET-EXTRACTION-REQUIRED /
// TRANSFORM-DEFINITION-REQUIRED) are listed honestly instead of faked.
{
  const visuals = [];
  for (const e of readdirSync(join(root, "records"))) {
    const m = e.match(/^(\d{4})-([A-Za-z]+)-([A-Za-z0-9]+)$/);
    if (!m) continue;
    const manDir = join(root, "records", e, "data", "structured");
    let manFile = null;
    try {
      manFile = readdirSync(manDir).find((f) => f.endsWith("-Visual-Manifest.yaml")) || null;
    } catch { continue; }
    if (!manFile) continue;
    const lines = readFileSync(join(manDir, manFile), "utf8").replace(/\r\n/g, "\n").split("\n");
    // Two manifest schemas exist: H-style (filename:/path:/status:) and
    // Li-style (file:/files: list + status:). Collect per-slot files, then
    // locate each file under the record tree so gallery URLs are exact.
    const recRoot = join(root, "records", e);
    const locate = (f) => {
      if (/\.png$/i.test(f)) return null;
      const dirs = ["images", "diagrams", "graphs", "models", "tables"];
      for (const d of dirs) {
        try {
          const found = [];
          const walk = (dir) => {
            for (const en of readdirSync(dir)) {
              const p = join(dir, en);
              if (statSync(p).isDirectory()) walk(p);
              else if (en === f) found.push(relative(recRoot, p).split(sep).join("/"));
            }
          };
          walk(join(recRoot, d));
          if (found.length) return found[0];
        } catch {}
      }
      return null;
    };
    let pending = [], slotStatus = "";
    const items = [];
    const flush = () => {
      pending.forEach((f) => {
        const at = locate(f);
        items.push({ file: f, path: at ? at.slice(0, at.length - f.length) : "", status: slotStatus || "UNKNOWN", found: !!at });
      });
      pending = [];
    };
    for (const ln of lines) {
      let pm;
      if ((pm = ln.match(/^  V\d+:/))) { flush(); slotStatus = ""; }
      else if ((pm = ln.match(/^    status: "([^"]+)"/))) { slotStatus = pm[1]; flush(); }
      else if ((pm = ln.match(/(?:filename|file): "([^"]+)"/))) pending.push(pm[1]);
      else if ((pm = ln.match(/^\s+-\s+"([^"]+)"/))) pending.push(pm[1]);
    }
    flush();
    if (!items.length) {
      // Summary-only manifest (no per-file slots): fall back to a direct
      // scan of generated SVGs so the gallery still reflects disk truth.
      try {
        const walkSvg = (dir, rel) => {
          for (const en of readdirSync(dir)) {
            const p = join(dir, en);
            if (statSync(p).isDirectory()) walkSvg(p, rel + en + "/");
            else if (en.endsWith(".svg")) items.push({ file: en, path: rel, status: "PRESENT", found: true });
          }
        };
        for (const d of ["images", "diagrams", "graphs"])
          try { walkSvg(join(recRoot, d), d + "/"); } catch {}
      } catch {}
    }
    visuals.push({ record: m[1], dir: `records/${e}`, items });
  }
  writeFileSync(join(import.meta.dirname, "visuals-index.json"),
    JSON.stringify({ visuals }, null, 1));
  console.log(`visuals index: ${visuals.length} records -> book/visuals-index.json`);
}

// ---- elements + identities: periodic navigation and record identity cards.
// Parsed from each record's main chapter front-matter (record values only);
// anything absent stays null and is omitted from the cards.
{
  const elements = [], identities = {};
  const recDirs = readdirSync(join(root, "records")).filter((e) =>
    /^\d{4}-/.test(e) && statSync(join(root, "records", e)).isDirectory()).sort();
  const count = (dir, sub, test) => {
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
  };
  for (const e of recDirs) {
    const m = e.match(/^(\d{4})-([A-Za-z-]+?)-([A-Za-z0-9]+)$/);
    if (!m) continue;
    const main = join(root, "records", e, `${e}.md`);
    let fm = {}, src = "";
    try {
      src = readFileSync(main, "utf8").replace(/\r\n/g, "\n");
      // Front-matter = the yaml fence before the first heading, or the
      // unfenced key block after the title (older records). Later fences
      // are status/tail blocks and must not override identity fields.
      const fenceIdx = src.indexOf("```yaml");
      const headIdx = src.search(/^# /m);
      let block = "";
      if (fenceIdx !== -1 && (headIdx === -1 || fenceIdx < headIdx)) {
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
      // Status tail blocks live outside the first fence — first hit wins.
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
    const chapter = `records/${e}/${e}.md`;
    const z = fm.atomic_number ? parseInt(fm.atomic_number, 10) : null;
    elements.push({ number, name, symbol, z: Number.isFinite(z) ? z : null, chapter });
    identities[number] = {
      number, name, symbol,
      z: Number.isFinite(z) ? z : null,
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
  writeFileSync(join(import.meta.dirname, "elements.json"), JSON.stringify({ elements }, null, 1));
  writeFileSync(join(import.meta.dirname, "identities.json"), JSON.stringify({ identities }, null, 1));
  console.log(`elements: ${elements.length} + identities -> book/elements.json, book/identities.json`);
}
