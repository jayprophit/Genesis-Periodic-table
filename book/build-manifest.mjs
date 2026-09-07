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
