// Checks MAT identifier integrity: uniqueness of definitions, malformed
// IDs, record ownership of child IDs. Run: npm run validate:ids
import { R, walkFiles, recordDirs, issue, warn, summary, MAT_ID_OR_PARENT, RESERVED } from "./lib.mjs";

let failed = 0;
const defined = new Map(); // id -> file
function define(id, file, kind) {
  if (defined.has(id)) {
    const [f0, k0] = defined.get(id);
    if (f0 === file) return;
    // Documentation mentions of an ID are references, not rival definitions.
    if (f0.startsWith("docs/") || file.startsWith("docs/")) {
      warn(file, null, id, `ID also defined in ${f0}`, "keep a single canonical definition; docs only reference");
      return;
    }
    issue(file, null, id, `duplicate ${kind} definition (also in ${f0} as ${k0})`, "definitions must be unique");
  } else defined.set(id, [file, kind]);
}
const knownParents = new Set(recordDirs().map((d) => "MAT:" + d.slice(0, 4)));

const files = [...walkFiles("records", (f) => /\.(md|yaml)$/.test(f)), ...walkFiles("docs", (f) => f.endsWith(".md")), ...walkFiles("data", (f) => f.endsWith(".yaml"))];
for (const f of files) {
  let src;
  try { src = R(f); } catch { continue; }
  const rec = "MAT:" + ((f.match(/records\/(\d{4})-/) || [])[1] || "");
  for (const m of src.matchAll(/MAT:([0-9]{4}(?::[A-Z0-9:+-]+)?)/g)) {
    let id = "MAT:" + m[1].replace(/:+$/, "");
    if (id.includes(RESERVED)) continue;
    if (!MAT_ID_OR_PARENT.test(id)) { issue(f, rec || null, id, "malformed MAT identifier", "form MAT:NNNN or MAT:NNNN:NS:child"); failed++; continue; }
    const parent = "MAT:" + m[1].slice(0, 4);
    if (!knownParents.has(parent)) {
      const n = parseInt(m[1].slice(0, 4), 10);
      if (n >= 0 && n <= 118) warn(f, rec || null, id, `forward reference to unpublished record ${parent}`, "mark RESERVED-PENDING-RECORD or publish the record");
      else { issue(f, rec || null, id, `references out-of-range record ${parent}`, "record numbers run 0000-0118"); failed++; }
      continue;
    }
    const inRec = f.startsWith("records/");
    if (inRec && !id.startsWith(rec) && !["MAT:0000", "MAT:REG"].some((p) => id.startsWith(p))) {
      // cross-record references are legal (relationships); only flag children claimed by wrong record
      const childNs = id.match(/^MAT:\d{4}:([A-Z]+)/)?.[1];
      if (childNs && !["REL"].includes(childNs)) warn(f, rec, id, "child ID owned by another record used here", "verify cross-record usage is intentional");
    }
  }
  // mat_id is canonically defined once (main record chapter); structured
  // files repeat it as a scoping reference. registry_id is unique per file.
  const parts = f.split("/");
  const isMain = parts.length === 3 && parts[2] === parts[1] + ".md";
  // Quoted examples inside fenced blocks are references, not definitions.
  const noFence = src.replace(/```[\s\S]*?```/g, "");
  for (const m of noFence.matchAll(/^(?:mat_id|registry_id):\s*"?([A-Z0-9:+-]+)"?/gm)) {
    const key = m[0].startsWith("mat_id") ? "mat_id" : "registry_id";
    if (key === "mat_id" && !isMain && !f.startsWith("docs/")) continue;
    define(m[1], f, "registry/mat identity");
  }
}
process.exitCode = summary("validate:ids") || failed ? 1 : 0;
