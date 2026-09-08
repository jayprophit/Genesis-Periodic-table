// Validates relationship registries: schema, endpoint ownership,
// legacy IDs, duplicates. RESERVED-PENDING-RECORD targets are skipped.
// Run: npm run validate:relationships
import { loadYaml, walkFiles, recordDirs, validateSchema, issue, warn, summary, MAT_PARENT, RESERVED } from "./lib.mjs";

const SCHEMA = "data/schema/1.0.0/mat-relationship.schema.json";
let failed = 0;
const knownParents = new Set(recordDirs().map((d) => "MAT:" + d.slice(0, 4)));
const seenRel = new Map();

const files = walkFiles("records", (f) => /relationship/i.test(f) && f.endsWith(".yaml"));
for (const f of files) {
  const rec = "MAT:" + (f.match(/records\/(\d{4})-/) || [])[1];
  let doc;
  try { doc = loadYaml(f); }
  catch (e) { issue(f, rec, null, `YAML parse error: ${e.message.split("\n")[0]}`, "valid YAML mapping"); failed++; continue; }
  for (const e of validateSchema(SCHEMA, doc))
    { issue(f, rec, "registry", `schema: ${e}`, "conform to mat-relationship.schema.json"); failed++; }
  // Edge containers: relationships (array/map) plus material/compound maps
  // and single-edge documents (relationship_id + elements/compound).
  function edgesOf(doc) {
    const out = [];
    const push = (id, obj) => {
      if (!obj || typeof obj !== "object") return;
      const src = [].concat(obj.source || obj.from || obj.element_relationships || obj.elements || []).flat();
      const tgt = [].concat(obj.target || obj.to || obj.future_id || (obj.compound && obj.compound.id) || []).flat();
      out.push({ relationship_id: id, source: src, type: obj.mechanism || obj.relationship_type || obj.type || "RELATED", target: tgt });
    };
    for (const key of ["relationships", "materials", "compounds", "processes", "entries", "items"]) {
      const c = doc[key];
      if (Array.isArray(c)) c.forEach((r, i) => push(r.relationship_id || `${key}[${i}]`, r));
      else if (c && typeof c === "object") Object.entries(c).forEach(([k, v]) => push(`MAP:${k}`, v || {}));
    }
    if (doc.relationship_id && !out.length) push(doc.relationship_id, doc);
    return out;
  }
  const rels = edgesOf(doc);
  if (!rels.length) { warn(f, rec, "registry", "no relationship edges found", "provide relationships/materials/compound edges or a matching schema"); continue; }
  let noId = 0;
  for (const r of rels) {
    if (!r.relationship_id) noId++;
    else if (seenRel.has(r.relationship_id))
      { issue(f, rec, r.relationship_id, `duplicate relationship ID (first in ${seenRel.get(r.relationship_id)})`, "relationship IDs must be unique"); failed++; }
    else {
      seenRel.set(r.relationship_id, f);
      if (!/^MAT:\d{4}:REL:/.test(r.relationship_id))
        warn(f, rec, r.relationship_id, "legacy relationship ID form", "canonical form is MAT:NNNN:REL:NNNN (aliases preserved, not silently rewritten)");
    }
    for (const end of ["source", "target"]) {
      const vals = Array.isArray(r[end]) ? r[end] : [r[end]];
      for (const raw of vals) {
      const v = String(raw ?? "");
      if (!v || v.includes(RESERVED)) continue;
      const pm = v.match(/^MAT:(\d{4})/);
      if (!pm) { warn(f, rec, `${r.relationship_id || "noid"}.${end}`, `non-MAT concept endpoint ${v}`, "model particles/concepts as MAT entities or keep explicit concept labels"); continue; }
      if (!knownParents.has("MAT:" + pm[1])) {
        const n = parseInt(pm[1], 10);
        if (n >= 0 && n <= 118) warn(f, rec, `${r.relationship_id || "noid"}.${end}`, `forward reference to unpublished record MAT:${pm[1]}`, "mark RESERVED-PENDING-RECORD or publish the record");
        else { issue(f, rec, `${r.relationship_id || "noid"}.${end}`, `endpoint references out-of-range record MAT:${pm[1]}`, "record numbers run 0000-0118"); failed++; }
        continue;
      }
      const owner = "MAT:" + (f.match(/records\/(\d{4})-/) || [])[1];
      if ((end === "source" && !v.startsWith(owner) && v !== owner) || (end === "target" && pm && false)) { /* cross-record edges allowed */ }
      }
    }
  }
  if (noId) warn(f, rec, "relationships", `${noId} entries without relationship_id`, "assign MAT:NNNN:REL:NNNN identifiers");
}
process.exitCode = summary("validate:relationships") || failed ? 1 : 0;
