// Validates parent record headers: numbering, identity, 0000 invariant,
// atomic-number alignment. Run: npm run validate:records
import { R, recordDirs, frontMatter, validateSchema, issue, summary } from "./lib.mjs";

const SCHEMA = "data/schema/1.0.0/mat-record.schema.json";
let failed = 0;

for (const dir of recordDirs()) {
  const m = dir.match(/^(\d{4})-/);
  const number = m[1];
  const main = `records/${dir}/${dir}.md`;
  let src;
  try { src = R(main); }
  catch { issue(main, null, null, "main chapter file missing", `records/${dir}/${dir}.md must exist`); failed++; continue; }
  const fm = frontMatter(src);
  for (const e of validateSchema(SCHEMA, fm))
    { issue(main, fm.mat_id || null, "front-matter", `schema: ${e}`, "conform to mat-record.schema.json"); failed++; }
  const matNum = (fm.mat_id || "").match(/^MAT:(\d{4})$/)?.[1];
  if (matNum && matNum !== number)
    { issue(main, fm.mat_id, "mat_id", `record number ${matNum} disagrees with directory ${number}`, "mat_id number must equal directory number"); failed++; }
  if (number === "0000") {
    if (fm.record_class && fm.record_class !== "FOUNDATION_REFERENCE")
      { issue(main, "MAT:0000", "record_class", `is ${fm.record_class}`, "MAT:0000 must be FOUNDATION_REFERENCE, never a chemical element"); failed++; }
    if (fm.atomic_number !== undefined && fm.atomic_number !== null && typeof fm.atomic_number === "number")
      { issue(main, "MAT:0000", "atomic_number", "foundation reference carries a numeric atomic number", "MAT:0000 must not have atomic_number (NOT-APPLICABLE allowed)"); failed++; }
  } else {
    if (fm.record_class === "FOUNDATION_REFERENCE")
      { issue(main, fm.mat_id, "record_class", "non-0000 record claims FOUNDATION_REFERENCE", "only MAT:0000 is FOUNDATION_REFERENCE"); failed++; }
    if (typeof fm.atomic_number === "number" && fm.atomic_number !== parseInt(number, 10))
      { issue(main, fm.mat_id, "atomic_number", `${fm.atomic_number} misaligned with record ${number}`, "MAT numbering stays aligned with atomic number"); failed++; }
    if (fm.parent_id && fm.parent_id !== "MAT:0000")
      { issue(main, fm.mat_id, "parent_id", `is ${fm.parent_id}`, "element parents must be MAT:0000"); failed++; }
  }
}

process.exitCode = summary("validate:records") || failed ? 1 : 0;
