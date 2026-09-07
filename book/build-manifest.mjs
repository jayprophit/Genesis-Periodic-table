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
addSection("Records", mdFiles(join(root, "records")));

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
  let text = "";
  try {
    text = stripMd(readFileSync(join(root, c.id), "utf8")).slice(0, 4000);
  } catch {}
  const refs = new Set();
  for (const m of text.matchAll(/MAT:(0\d{3})/g)) refs.add(m[1]);
  // dataset alias grouping: records/NNNN-Name-Symbol/... -> ["nnnn","name","symbol"]
  let dataset = null, aks = [];
  const rm = c.id.match(/^records\/(\d{4})-([A-Za-z]+)-([A-Za-z]+)\//);
  if (rm) {
    dataset = `${rm[1]} ${rm[2]}`;
    aks = [rm[1], rm[2].toLowerCase(), rm[3].toLowerCase()];
    if (/^0001-/.test(c.id)) aks.push("hydrogen", "h");
    if (/^0002-/.test(c.id)) aks.push("helium", "he");
    if (/^0003-/.test(c.id)) aks.push("lithium", "li");
    if (/^0004-/.test(c.id)) aks.push("beryllium", "be");
    if (/^0005-/.test(c.id)) aks.push("boron", "b");
  }
  const dois = new Set();
  try {
    const raw = readFileSync(join(root, c.id), "utf8");
    for (const m of raw.matchAll(/10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+/g)) dois.add(m[0].replace(/[).,;]+$/, ""));
  } catch {}
  return { i, title: c.title, section: c.section, text, refs: [...refs], dataset, aks: [...new Set(aks)], dois: [...dois].slice(0, 6) };
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
