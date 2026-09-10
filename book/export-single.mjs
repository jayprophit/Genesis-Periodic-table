// Builds dist/MAT-ebook.html: linear HTML edition for Print-to-PDF,
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
let docs = [];
manifest.chapters.forEach((sec) => sec.items.forEach((it) => docs.push({ ...it, section: sec.section })));
const proof=process.argv.includes('--proof');
if(proof){
 const selected=[
 'docs/00-front-matter/03-How-to-Use-MAT-Codex.md',
 'records/0001-Hydrogen-H/tables/0001-Hydrogen-H-TABLE-002-Atomic-Identity.md',
 'records/0011-Sodium-Na/calculations/0011-Sodium-Na-CALC-003-Na24-BetaMinus-Q.md',
 'records/0012-Magnesium-Mg/0012-Magnesium-Mg-Nuclear-Evaluation.md',
 'records/0013-Aluminium-Al/0013-Aluminium-Al.md'];
 docs=selected.map(id=>{const d=docs.find(d=>d.id===id);if(!d)throw new Error('Missing proof chapter '+id);return d;});
}

let contents = `<nav class="print-contents"><h2>Contents</h2><ul>`;
docs.forEach((d, k) => { contents += `<li><a href="#ch${k}">${esc(d.section)} — ${esc(d.title)}</a></li>`; });
contents += `</ul></nav>`;

let out = "";
docs.forEach((d, k) => {
  let md = "";
  try { md = readFileSync(join(root, d.id), "utf8").replace(/\r\n/g,'\n'); }
  catch { md = `# ${d.title}\n\n*Source file missing from this export.*`; }
  const { html } = renderDocument(md, d.id, { docs,linkFor:(id,anchor)=>{const j=docs.findIndex(x=>x.id===id);return '#ch'+j+(anchor?'-'+anchor:'');} });
  const unique=html.replace(/ id="([^"]+)"/g,(_,id)=>` id="ch${k}-${id}"`);
  out += `<section class="print-chapter" id="ch${k}"><p class="print-source">${esc(d.section)} · source: ${esc(d.id)}</p>${unique}</section>\n`;
});

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Materials Atlas Table Codex — ${proof?'print proof':'complete edition'}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="../book/math-config.js"></script><script defer src="../book/vendor/tex-svg.js"></script>
<style>\n${css}\n</style>
<style>.print-chapter{padding:24px 0;max-width:1100px;margin:auto}.print-chapter h2{font-family:var(--serif)}@media print{.print-chapter{padding:0}.print-chapter h1{font-size:24pt}.print-chapter h2{font-size:18pt}.print-chapter h3{font-size:14pt}}</style>
</head>
<body class="light">
<main id="reader"><div id="content">
<div class="print-cover"><p class="print-title">Materials Atlas Table Codex</p>
<p class="print-subtitle">Atlas of Matter, Materials, Properties, States, Processes and Transformations — ${proof?'representative print proof':'complete working edition'}</p><p>${proof?'Five selected chapters demonstrate guide text, technical tables, equations and source review.':'All published chapters are included.'} Scientific review, historical claims and explicitly missing data retain their original status. Inclusion is not a claim of scientific completeness.</p></div>
${contents}
${out}
</div></main>
<script>window.addEventListener('load',async()=>{try{await window.MathJax.startup.promise;await window.MathJax.typesetPromise();document.body.dataset.mathReady='true';}catch{document.body.dataset.mathReady='unavailable';}});</script>
</body>
</html>`;
const filename=proof?'MAT-print-proof.html':'MAT-ebook.html';
writeFileSync(join(dist, filename), html);
console.log(`dist/${filename} written (${docs.length} chapters). Open via the preview server (/dist/${filename}), then Print to PDF;`);
console.log("or convert to EPUB with Calibre, or to Kindle format with Kindle Previewer.");
