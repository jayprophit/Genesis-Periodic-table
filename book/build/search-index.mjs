// Full-text search index + related-chapter graph + evidence lanes.
// Writes book/search-index.json. Deterministic: manifest order only.
import { join } from "node:path";
import { root, stripMd, writeJson, readText } from "./lib.mjs";

export function buildSearchIndex(flat) {
  const sdocs = flat.map((c, i) => {
    let full = "";
    try { full = stripMd(readText(c.id)); } catch {}
    const text = full;
    const refs = new Set();
    try {
      const raw = readText(c.id);
      for (const m of raw.matchAll(/MAT:(0\d{3})/g)) refs.add(m[1]);
    } catch {}
    let dataset = null, aks = [];
    const rm = c.id.match(/^records\/(\d{4})-([A-Za-z]+)-([A-Za-z0-9]+)\//);
    if (rm) {
      dataset = `${rm[1]} ${rm[2]}`;
      aks = [rm[1], rm[1].replace(/^0+/, "") || "0", rm[2].toLowerCase(), rm[3].toLowerCase()];
    }
    const dois = new Set();
    try {
      const raw = readText(c.id);
      for (const m of raw.matchAll(/10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+/g)) dois.add(m[0].replace(/[).,;]+$/, ""));
    } catch {}
    let lane = "core";
    const lid = c.id.toLowerCase();
    if (/causali-e|claims|historical|alternative|unconventional/.test(lid)) lane = "claims";
    else if (/experiments\/|research-intake|emerging|prediction|hypothes|proposed|speculative/.test(lid)) lane = "research";
    return { i, id: c.id, path: c.path, title: c.title, section: c.section, lane, text, refs: [...refs], dataset, aks: [...new Set(aks)], dois: [...dois].slice(0, 6) };
  });
  const byRec = {};
  sdocs.forEach((d) => d.refs.forEach((r) => ((byRec[r] ??= new Set()).add(d.i))));
  const related = sdocs.map((d) => {
    const s = new Set();
    d.refs.forEach((r) => byRec[r].forEach((j) => { if (j !== d.i) s.add(j); }));
    return [...s].slice(0, 8);
  });
  writeJson("search-index.json", { docs: sdocs, related });
  console.log(`search index: ${sdocs.length} docs -> book/search-index.json`);
}
