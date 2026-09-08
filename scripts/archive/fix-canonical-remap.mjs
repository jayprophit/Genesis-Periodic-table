// One-off canonical source remap (reviewed): SRC-000164 -> SRC-000008
// (same NUBASE2020 publication; alias retained in registry),
// SRC-000154-PSII -> SRC-000155 (alias retained), in record data only.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = join(import.meta.dirname, "..");
let n = 0;
function sub(path, from, to) {
  const p = join(root, path);
  const t = readFileSync(p, "utf8");
  const c = t.split(from).length - 1;
  if (!c) { console.log("SKIP (not found)", path); return; }
  writeFileSync(p, t.split(from).join(to));
  n += c;
  console.log(`ok ${path}: ${c}x`);
}
// Fluorine: duplicate NUBASE registration merged into SRC-000008.
const files164 = [
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-31-Fluorine-31.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-30-Fluorine-30.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-29-Fluorine-29.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-28-Fluorine-28.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-27-Fluorine-27.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-26-Fluorine-26.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-25-Fluorine-25.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-24-Fluorine-24.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-23-Fluorine-23.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-22-Fluorine-22.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-21-Fluorine-21.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-20-Fluorine-20.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-18-Fluorine-18.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-17-Fluorine-17.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-16-Fluorine-16.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-15-Fluorine-15.yaml",
  "records/0009-Fluorine-F/data/isotopes/0009-Fluorine-F-Isotope-14-Fluorine-14.yaml",
];
for (const f of files164) sub(f, '"SRC-000164"', '"SRC-000008"');
// Oxygen PSII paper now canonical SRC-000155.
sub(
  "records/0008-Oxygen-O/experiments/0008-Oxygen-O-Experiments.yaml",
  'source_id: "SRC-000154-PSII"',
  'source_id: "SRC-000155"\n    source_alias: "SRC-000154-PSII"'
);
console.log("total replacements:", n);
