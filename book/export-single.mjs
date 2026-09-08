// Builds dist/MAT-ebook.html: single-file linear edition for Print-to-PDF,
// Calibre (EPUB) or Kindle Previewer. Run: node book/export-single.mjs
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderDocument, esc } from "./reader-core.mjs";

const book = join(import.meta.dirname);
const root = join(book, "..");
const dist = join(root, "dist");
mkdirSync(dist, { recursive: true });

const manifest = JSON.parse(readFileSync(join(book, "manifest.json"), "utf8"));
const css = readFileSync(join(book, "styles.css"), "utf8");
const docs = [];
manifest.chapters.forEach((sec) => sec.items.forEach((it) => docs.push({ ...it, section: sec.section })));

let contents = `<nav class="print-contents"><h2>Contents</h2><ul>`;
docs.forEach((d, k) => { contents += `<li><a href="#ch${k}">${esc(d.section)} — ${esc(d.title)}</a></li>`; });
contents += `</ul></nav>`;

let out = "";
docs.forEach((d, k) => {
  let md = "";
  try { md = readFileSync(join(root, d.id), "utf8"); }
  catch { md = `# ${d.title}\n\n*Source file missing from this export.*`; }
  const { html } = renderDocument(md, d.id, { docs });
  out += `<section class="print-chapter" id="ch${k}"><p class="print-source">${esc(d.section)} · source: ${esc(d.id)}</p>${html}</section>\n`;
});

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Materials Atlas Table Codex — complete edition</title>
<style>\n${css}\n</style>
</head>
<body class="light">
<main id="reader"><div id="content">
<div class="print-cover"><p class="print-title">Materials Atlas Table Codex</p>
<p class="print-subtitle">Atlas of Matter, Materials, Properties, States, Processes and Transformations — complete edition</p></div>
${contents}
${out}
</div></main>
</body>
</html>`;
writeFileSync(join(dist, "MAT-ebook.html"), html);
console.log(`dist/MAT-ebook.html written (${docs.length} chapters). Open via the preview server (/dist/MAT-ebook.html), then Print to PDF;`);
console.log("or convert to EPUB with Calibre, or to Kindle format with Kindle Previewer.");
