// Validates visual/table/graph manifests against schemas and the filesystem.
// GENERATED/COMPLETE files must exist; unregistered files are reported.
// Run: npm run validate:assets
import { loadYaml, walkFiles, validateSchema, issue, warn, summary } from "./lib.mjs";

let failed = 0;
// Per-record filename sets so nested paths (images/scientific/…) resolve.
const treeCache = new Map();
function treeFiles(dir) {
  if (!treeCache.has(dir)) {
    const s = new Set();
    for (const f of walkFiles(dir, () => true)) s.add(f.split("/").pop());
    treeCache.set(dir, s);
  }
  return treeCache.get(dir);
}
const sched = [
  { re: /visual-manifest/i, schema: "data/schema/1.0.0/mat-visual-manifest.schema.json", kind: "visual" },
  { re: /table-manifest/i, schema: "data/schema/1.0.0/mat-table-manifest.schema.json", kind: "table" },
  { re: /graph-manifest/i, schema: "data/schema/1.0.0/mat-graph-manifest.schema.json", kind: "graph" },
];
const DONE = /^(GENERATED|COMPLETE|CORE-COMPLETE|ARCHITECTURE-COMPLETE)$/;
const PENDING = /(REQUIRED|PENDING|NOT-GENERATED|NOT-YET|EXTRACTION)/;

for (const { re, schema, kind } of sched) {
  for (const f of walkFiles("records", (x) => re.test(x) && x.endsWith(".yaml"))) {
    const rec = "MAT:" + (f.match(/records\/(\d{4})-/) || [])[1];
    const dir = f.split("/").slice(0, 2).join("/");
    let doc;
    try { doc = loadYaml(f); }
    catch (e) { issue(f, rec, null, `YAML parse error: ${e.message.split("\n")[0]}`, "valid YAML"); failed++; continue; }
    for (const e of validateSchema(schema, doc))
      { issue(f, rec, "manifest", `schema: ${e}`, `conform to ${schema.split("/").pop()}`); failed++; }
    const entries = [];
    if (kind === "visual" && doc.visuals) {
      for (const [slot, s] of Object.entries(doc.visuals)) {
        const files = [...(s.assets || []).map((a) => a.filename).filter(Boolean),
          s.filename, s.file, ...(s.files || [])].filter(Boolean);
        for (const name of files) entries.push({ slot, name, status: s.status || "", sub: s.path || "" });
      }
    }
    if (kind === "table") for (const t of doc.tables || []) {
      const fname = t.file || t.filename;
      if (fname) entries.push({ slot: t.id || t.table_id || t.name || "", name: fname, status: t.status || "", sub: "tables/" });
    }
    if (kind === "graph") for (const g of doc.graphs || []) {
      if (!g.filename) continue; // planning entry: nothing on disk to verify
      entries.push({ slot: g.graph_id || g.id || "", name: g.filename, status: g.status || "", sub: "graphs/" });
      if (g.data_filename) entries.push({ slot: g.graph_id || g.id || "", name: "data/" + g.data_filename, status: g.status || "", sub: "graphs/" });
    }
    for (const en of entries) {
      if (!en.name || /\.png$/i.test(en.name)) {
        if (en.name && DONE.test(en.status)) { issue(f, rec, en.slot, `${en.name} marked ${en.status} but PNGs are not verified on disk`, "mark photo slots SOURCE-IMAGE-REQUIRED until supplied"); failed++; }
        continue;
      }
      const found = treeFiles(dir).has(en.name.split("/").pop());
      if (DONE.test(en.status) && !found)
        { issue(f, rec, en.slot || en.name, `${en.name} marked ${en.status} but file is missing`, "status must agree with the filesystem"); failed++; }
      if (!DONE.test(en.status) && !PENDING.test(en.status) && found)
        warn(f, rec, en.slot || en.name, `${en.name} exists on disk but slot status is ${en.status || "unset"}`, "flip to GENERATED/COMPLETE when the file lands");
    }
  }
}
process.exitCode = summary("validate:assets") || failed ? 1 : 0;
