// Applies verified Hydrogen patch resolutions: stale RESERVED markers for
// now-published records -> RESOLVED; last ION:H0 -> ATOM:H.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = join(import.meta.dirname, "..");
const rp = join(root, "records/0001-Hydrogen-H/relationships/0001-Hydrogen-H-Relationships.yaml");
let t = readFileSync(rp, "utf8").replace(/\r\n/g, "\n");
for (const id of ["REL-H-0050", "REL-H-0051", "REL-H-0052", "REL-H-0063"]) {
  const re = new RegExp(`(- relationship_id: "${id}"[\\s\\S]*?target_status: ")RESERVED-PENDING-RECORD(")`);
  if (!re.test(t)) throw new Error("pattern missing for " + id);
  t = t.replace(re, "$1RESOLVED$2");
  console.log("resolved", id);
}
writeFileSync(rp, t);
const pp = join(root, "records/0001-Hydrogen-H/data/isotopes/0001-Hydrogen-H-Isotope-01-Protium.yaml");
let p = readFileSync(pp, "utf8").replace(/\r\n/g, "\n");
if (!p.includes('"MAT:0001:ION:H0"')) throw new Error("protium pattern gone");
p = p.split('"MAT:0001:ION:H0"').join('"MAT:0001:ATOM:H"');
writeFileSync(pp, p);
console.log("protium ION:H0 -> ATOM:H");
