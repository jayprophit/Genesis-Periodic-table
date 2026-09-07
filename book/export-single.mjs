// Builds dist/MAT-ebook.html: single-file linear edition for Print-to-PDF,
// Calibre (EPUB) or Kindle Previewer (KPF). Run: node book/export-single.mjs
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const book = join(import.meta.dirname);
const root = join(book, "..");
const dist = join(root, "dist");
mkdirSync(dist, { recursive: true });

let html = readFileSync(join(book, "index.html"), "utf8");
const css = readFileSync(join(book, "styles.css"), "utf8");
let js = readFileSync(join(book, "book.js"), "utf8");

html = html
  .replace('<link rel="stylesheet" href="./styles.css">', `<style>\n${css}\n</style>`)
  .replace('<link rel="manifest" href="./manifest.webmanifest">', "")
  .replace('<script src="./book.js"></script>', `<script>window.MAT_PRINT_ALL = true;</script>\n<script>\n${js}\n</script>`)
  .replace('navigator.serviceWorker.register("./sw.js")', 'Promise.reject(new Error("no-sw-in-export"))')
  .replace('fetch("./manifest.json")', 'fetch("../book/manifest.json")');

writeFileSync(join(dist, "MAT-ebook.html"), html);
console.log("dist/MAT-ebook.html written. Open via the preview server (/dist/MAT-ebook.html), then Print to PDF;");
console.log("or convert to EPUB with Calibre, or to Kindle format with Kindle Previewer.");
