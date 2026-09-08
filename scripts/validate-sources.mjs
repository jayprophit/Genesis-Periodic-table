// Validates the global source registry and canonical-vs-alias usage.
// Run: npm run validate:sources
import { loadYaml, walkFiles, R, validateSchema, issue, warn, summary, SRC_CANON } from "./lib.mjs";

const SCHEMA = "data/schema/1.0.0/mat-source-registry.schema.json";
let failed = 0;
const reg = loadYaml("data/registries/sources.yaml");
for (const e of validateSchema(SCHEMA, reg))
  { issue("data/registries/sources.yaml", null, "registry", `schema: ${e}`, "conform to mat-source-registry.schema.json"); failed++; }

const canon = new Map(), aliasToCanon = new Map(), seenDoi = new Map();
for (const s of reg.sources || []) {
  if (canon.has(s.source_id))
    { issue("data/registries/sources.yaml", null, s.source_id, "duplicate canonical source ID", "source_id must be unique"); failed++; }
  canon.set(s.source_id, s);
  for (const a of s.source_aliases || []) {
    if (aliasToCanon.has(a))
      { issue("data/registries/sources.yaml", null, a, `alias also maps to ${aliasToCanon.get(a)}`, "each alias must map to exactly one canonical ID"); failed++; }
    aliasToCanon.set(a, s.source_id);
  }
  if (s.doi) {
    const d = String(s.doi).toLowerCase();
    if (seenDoi.has(d)) warn("data/registries/sources.yaml", null, s.source_id, `DOI ${s.doi} also used by ${seenDoi.get(d)}`, "deduplicate or justify shared DOI");
    else seenDoi.set(d, s.source_id);
  }
}

// Scan canonical structured data for source references.
const files = walkFiles("records", (f) => f.endsWith(".yaml"));
const idRe = /source_ids?:\s*"([^"]+)"/g;
for (const f of files) {
  const src = R(f);
  const rec = (f.match(/records\/(\d{4})-/) || [])[1];
  for (const m of src.matchAll(idRe)) {
    const v = m[1];
    if (SRC_CANON.test(v)) {
      if (!canon.has(v)) { issue(f, rec ? "MAT:" + rec : null, m[0].slice(0, 40), `canonical ${v} not in registry`, "every canonical reference must resolve"); failed++; }
    } else if (aliasToCanon.has(v)) {
      warn(f, rec ? "MAT:" + rec : null, `source_id ${v}`, `alias used in canonical data (canonical: ${aliasToCanon.get(v)})`, "use canonical source_id; keep alias only as source_alias");
    } else {
      issue(f, rec ? "MAT:" + rec : null, `source_id ${v}`, "unresolvable source reference", "reference a registered canonical ID or alias"); failed++;
    }
  }
  for (const m of src.matchAll(/source_alias:\s*"([^"]+)"/g)) {
    if (!aliasToCanon.has(m[1]) && !SRC_CANON.test(m[1]))
      { issue(f, rec ? "MAT:" + rec : null, `source_alias ${m[1]}`, "alias not in registry", "register every alias"); failed++; }
  }
}

process.exitCode = summary("validate:sources") || failed ? 1 : 0;
