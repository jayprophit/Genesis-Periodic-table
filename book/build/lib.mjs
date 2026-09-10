// Shared build helpers (book asset pipeline). Imported by book/build/*.mjs.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

export const root = join(import.meta.dirname, "..", "..");
export const bookDir = join(import.meta.dirname, "..");
export { writeFileSync };

export function titleOf(file, fallback) {
  try {
    const text = readFileSync(file, "utf8");
    const m = text.match(/^#{1,3}\s+(.+?)\s*$/m);
    if (m) return m[1].replace(/[*_`]/g, "").slice(0, 90);
  } catch {}
  return fallback;
}
export function mdFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...mdFiles(p));
    else if (e.endsWith(".md")) out.push(p);
  }
  return out.sort();
}
export function stripMd(t) {
  return t
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`|$-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
export function writeJson(name, data, indent) {
  writeFileSync(join(bookDir, name), JSON.stringify(data, null, indent));
}
export function readJson(name, fallback) {
  try { return JSON.parse(readFileSync(join(bookDir, name), "utf8")); }
  catch { return fallback; }
}
export function readText(rel) {
  return readFileSync(join(root, rel), "utf8").replace(/\r\n/g, "\n");
}
export function rel(p) {
  return relative(root, p).split(sep).join("/");
}
