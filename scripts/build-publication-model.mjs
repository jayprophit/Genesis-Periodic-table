#!/usr/bin/env node
/* MAT Codex: build-publication-model.mjs
 * Generates publication model JSON from canonical MAT data.
 * Run: npm run build:publication
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const outDir = join(root, "data", "publication", "generated");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

function loadJSON(rel, fallback) {
  const p = join(root, rel);
  if (!existsSync(p)) return fallback;
  return JSON.parse(readFileSync(p, "utf8"));
}

console.log("Building MAT publication model...\n");

// Load canonical sources
const manifest = loadJSON("book/manifest.json", null);
const elements118 = loadJSON("book/data/elements-118.json", { elements: [], referenceRecords: [] });
const chartDatasets = loadJSON("book/data/chart-datasets.json", {});
const russell = loadJSON("book/data/russell-periodic.json", { octaves: [] });
const combined = loadJSON("book/data/combined-periodic.json", { overlay: [] });
const metadata = loadJSON("book/data/publication/metadata.json", {});

// 1. publication-records.json — flat list of all chapters with metadata
const records = [];
if (manifest) {
  for (const sec of manifest.chapters || []) {
    for (const item of sec.items || []) {
      const matMatch = item.id.match(/records\/(\d{4})/);
      records.push({
        id: item.id,
        mat: matMatch ? `MAT:${matMatch[1]}` : null,
        title: item.title,
        section: sec.section,
        lane: sec.section === "Material Atlas Table" ? "core" :
              sec.section === "Guide, Reference & Book Information" ? "reference" : "other",
      });
    }
  }
}
writeFileSync(join(outDir, "publication-records.json"), JSON.stringify(records, null, 2));
console.log(`  records: ${records.length} chapters`);

// 2. publication-elements.json — element data from canonical sources
const elements = elements118.elements || [];
const refRecords = elements118.referenceRecords || [];
writeFileSync(join(outDir, "publication-elements.json"), JSON.stringify({
  elements,
  referenceRecords: refRecords,
}, null, 2));
console.log(`  elements: ${elements.length} elements, ${refRecords.length} reference records`);

// 3. publication-charts.json — chart datasets with provenance
const charts = [];
const abd = chartDatasets.abundanceDatasets || {};
if (abd.cosmic) {
  charts.push({
    id: "cosmic-abundance",
    type: "pie",
    title: "Cosmic Abundance of Elements",
    dataset: abd.cosmic,
    provenance: chartDatasets.provenance_note || "Unknown",
  });
}
if (abd.crust) {
  charts.push({
    id: "crust-abundance",
    type: "pie",
    title: "Earth's Crust Abundance",
    dataset: abd.crust,
    provenance: chartDatasets.provenance_note || "Unknown",
  });
}
if (abd.humanBody) {
  charts.push({
    id: "human-body-abundance",
    type: "pie",
    title: "Human Body Abundance",
    dataset: abd.humanBody,
    provenance: chartDatasets.provenance_note || "Unknown",
  });
}
if (chartDatasets.carbonAllotropesRadar) {
  charts.push({
    id: "carbon-allotropes",
    type: "radar",
    title: "Carbon Allotrope Properties",
    dataset: chartDatasets.carbonAllotropesRadar,
    provenance: chartDatasets.provenance_note || "Unknown",
  });
}
writeFileSync(join(outDir, "publication-charts.json"), JSON.stringify({ charts }, null, 2));
console.log(`  charts: ${charts.length} chart definitions`);

// 4. publication-periodic.json — combined periodic table data
const periodicCells = [];
if (manifest) {
  for (const sec of manifest.chapters || []) {
    if (sec.section !== "Material Atlas Table") continue;
    for (const item of sec.items || []) {
      const matMatch = item.id.match(/records\/(\d{4})/);
      if (matMatch) {
        periodicCells.push({ mat: `MAT:${matMatch[1]}`, title: item.title, id: item.id });
      }
    }
  }
}
writeFileSync(join(outDir, "publication-periodic.json"), JSON.stringify({
  standard: { cells: periodicCells },
  russell: russell,
  combined: combined,
}, null, 2));
console.log(`  periodic: standard + Russell + overlay`);

// 5. publication-glossary.json — scientific terms
const glossary = [
  { term: "Electronegativity", definition: "Measure of the tendency of an atom to attract a bonding pair of electrons.", symbol: "χ", unit: "Pauling scale", source: "SRC-000001" },
  { term: "Ionization Energy", definition: "Energy required to remove an electron from a gaseous atom or ion.", symbol: "IE", unit: "eV", source: "SRC-000001" },
  { term: "Atomic Radius", definition: "Distance from the center of the nucleus to the boundary of the electron cloud.", symbol: "r", unit: "pm", source: "SRC-000001" },
  { term: "Half-life", definition: "Time for half of a radioactive substance to decay.", symbol: "t½", unit: "varies", source: "SRC-000001" },
  { term: "Allotrope", definition: "Different structural forms of the same element in the same physical state.", symbol: null, unit: null, source: null },
  { term: "Isotope", definition: "Atoms of the same element with different numbers of neutrons.", symbol: null, unit: null, source: null },
  { term: "Phase", definition: "Distinct state of matter with uniform properties (solid, liquid, gas, plasma).", symbol: null, unit: null, source: null },
  { term: "Electron Configuration", definition: "Distribution of electrons in atomic orbitals.", symbol: null, unit: null, source: null },
  { term: "Oxidation State", definition: "Hypothetical charge an atom would have if all bonds were 100% ionic.", symbol: null, unit: null, source: null },
  { term: "Crystal Structure", definition: "Arrangement of atoms in a crystalline solid.", symbol: null, unit: null, source: null },
  { term: "Lattice", definition: "Regular repeating arrangement of points in space representing atomic positions.", symbol: null, unit: null, source: null },
  { term: "Band Gap", definition: "Energy difference between the top of the valence band and the bottom of the conduction band.", symbol: "Eg", unit: "eV", source: null },
  { term: "Magnetic Moment", definition: "Quantity that determines the magnetic force on a moving electric charge.", symbol: "μ", unit: "μB", source: null },
  { term: "Specific Heat", definition: "Amount of heat per unit mass required to raise the temperature by one degree.", symbol: "c", unit: "J/(g·K)", source: null },
  { term: "Thermal Conductivity", definition: "Rate at which heat passes through a material.", symbol: "κ", unit: "W/(m·K)", source: null },
  { term: "Density", definition: "Mass per unit volume of a substance.", symbol: "ρ", unit: "g/cm³", source: null },
  { term: "Melting Point", definition: "Temperature at which a solid becomes a liquid.", symbol: "Tm", unit: "K", source: null },
  { term: "Boiling Point", definition: "Temperature at which a liquid becomes a gas.", symbol: "Tb", unit: "K", source: null },
  { term: "Enthalpy of Formation", definition: "Change in enthalpy when one mole of a compound is formed from its elements.", symbol: "ΔHf", unit: "kJ/mol", source: null },
  { term: "Electron Affinity", definition: "Energy change when an electron is added to a neutral atom.", symbol: "EA", unit: "eV", source: null },
];
writeFileSync(join(outDir, "publication-glossary.json"), JSON.stringify({ glossary }, null, 2));
console.log(`  glossary: ${glossary.length} terms`);

// 6. publication-index.json — cross-reference index
const indexByType = {
  elements: elements.map((e) => ({ z: e.z, symbol: e.symbol, name: e.name })),
  records: records.filter((r) => r.mat).map((r) => ({ mat: r.mat, title: r.title, id: r.id })),
  sections: [...new Set(records.map((r) => r.section))],
};
writeFileSync(join(outDir, "publication-index.json"), JSON.stringify(indexByType, null, 2));
console.log(`  index: ${indexByType.elements.length} elements, ${indexByType.records.length} MAT records`);

// 7. publication-metadata.json — publication info
writeFileSync(join(outDir, "publication-metadata.json"), JSON.stringify({
  ...metadata,
  generatedAt: new Date().toISOString(),
  schemaVersion: "1.0.0",
  publicationVersion: "1.0.0-alpha",
}, null, 2));
console.log(`  metadata: publication info`);

console.log(`\nPublication model built: ${outDir}`);
console.log(`  7 files generated from canonical MAT data.`);
