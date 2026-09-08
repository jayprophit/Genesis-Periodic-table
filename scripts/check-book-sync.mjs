// Checks generated book artifacts agree with canonical sources.
// Run: npm run validate:booksync
import { R, exists, recordDirs, issue, warn, summary } from "./lib.mjs";

let failed = 0;
const need = ["book/manifest.json", "book/search-index.json", "book/visuals-index.json", "book/elements.json", "book/identities.json", "book/scenes/index.json"];
for (const p of need) if (!exists(p)) { issue(p, null, null, "generated artifact missing", "run npm run build:book"); failed++; }

let manifest = null, elements = null, identities = null;
try { manifest = JSON.parse(R("book/manifest.json")); } catch { issue("book/manifest.json", null, null, "unparseable", "rebuild the book"); failed++; }
try { elements = JSON.parse(R("book/elements.json")); } catch {}
try { identities = JSON.parse(R("book/identities.json")); } catch {}

if (manifest) {
  const sections = manifest.chapters.map((c) => c.section);
  if (!sections.includes("Material Atlas Table")) { issue("book/manifest.json", null, "sections", "Material Atlas Table section missing", "records must publish under Material Atlas Table"); failed++; }
  const ids = manifest.chapters.flatMap((c) => c.items.map((i) => i.id));
  if (!ids.includes("docs/00-front-matter/03-How-to-Use-MAT-Codex.md")) { issue("book/manifest.json", null, "front-matter", "How to Use MAT Codex chapter missing", "renamed chapter must be indexed"); failed++; }
  if (ids.some((i) => i.includes("03-How-to-Use-MAT.md") && !i.includes("Codex"))) { issue("book/manifest.json", null, "front-matter", "stale old How-to-Use path indexed", "index only the renamed chapter"); failed++; }
}
if (elements) {
  const dirs = recordDirs().map((d) => d.slice(0, 4));
  const have = elements.elements.map((e) => e.number);
  for (const d of dirs) if (!have.includes(d)) { issue("book/elements.json", "MAT:" + d, null, "record missing from elements index", "regenerate elements.json"); failed++; }
  // Cover must derive status, not hardcode it.
  try {
    const html = R("book/index.html");
    if (/0000.*pending/i.test(html)) { issue("book/index.html", "MAT:0000", "cover-meta", "hardcoded stale 0000 state", "derive record state from identities.json at runtime"); failed++; }
    if (!/cover-range|cover-origin|element-status/.test(html)) warn("book/index.html", null, "cover-meta", "cover record-range/origin spans lack runtime IDs", "bind them to generated metadata");
  } catch {}
}
if (identities) {
  for (const [n, idn] of Object.entries(identities.identities || {})) {
    if (!idn.status) warn("book/identities.json", "MAT:" + n, "status", "record status missing", "every published record needs a status");
  }
}
process.exitCode = summary("validate:booksync") || failed ? 1 : 0;
