// Periodic navigation index: conventional 118 layout plus published flags.
// Writes book/periodic.json. Only existing MAT records link.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { root, writeJson, readJson } from "./lib.mjs";

export function buildPeriodicIndex() {
  const nav = JSON.parse(readFileSync(join(root, "data/navigation/periodic-table.json"), "utf8"));
  const els = (readJson("elements.json", { elements: [] }).elements) || [];
  const byZ = new Map(els.filter((e) => e.z).map((e) => [e.z, e]));
  const cells = nav.elements.map((c) => {
    const pub = byZ.get(c.z);
    return { ...c, mat: pub ? pub.number : null, chapter: pub ? pub.chapter : null, published: !!pub };
  });
  writeJson("periodic.json", { version: nav.version, cells }, 1);
  const n = cells.filter((c) => c.published).length;
  console.log(`periodic: ${cells.length} cells, ${n} published -> book/periodic.json`);
}
