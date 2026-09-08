#!/usr/bin/env node
// MAT: Generate baseline element record folders for all 118 elements
// Skips curated records (0001-0009) — only generates 0010-0118
// Reads from data/catalog/elements-baseline.json

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BASELINE_PATH = join(ROOT, 'data', 'catalog', 'elements-baseline.json');
const RECORDS_DIR = join(ROOT, 'records');

// Curated elements to skip
const CURATED = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

// Read baseline catalog
const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));

function pad4(n) {
  return String(n).padStart(4, '0');
}

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function ensureGitKeep(dir) {
  ensureDir(dir);
  const gitkeep = join(dir, '.gitkeep');
  if (!existsSync(gitkeep)) {
    writeFileSync(gitkeep, '');
  }
}

function writeIfNew(path, content) {
  if (!existsSync(path)) {
    writeFileSync(path, content, 'utf8');
    return true;
  }
  return false;
}

function elementDir(el) {
  return join(RECORDS_DIR, `${pad4(el.z)}-${el.name}-${el.symbol}`);
}

function formatElectronConfig(config) {
  if (!config || !config.value) return 'UNKNOWN';
  return config.value;
}

function formatAtomicWeight(weight) {
  if (!weight || !weight.value) return 'UNKNOWN';
  return String(weight.value);
}

function formatIonizationEnergy(ie) {
  if (!ie || !ie.value) return 'UNKNOWN';
  return `${ie.value} ${ie.unit || 'eV'}`;
}

function formatElectronegativity(en) {
  if (!en || !en.value) return 'UNKNOWN';
  return `${en.value} ${en.unit || 'Pauling'}`;
}

function formatPhase(phase) {
  if (!phase || !phase.value) return 'UNKNOWN';
  return phase.value;
}

// Generate styled circle SVG with electron configuration
function generateSVG(el) {
  const matId = `MAT:${pad4(el.z)}`;
  const ec = formatElectronConfig(el.electronConfiguration);
  const aw = formatAtomicWeight(el.atomicWeight);
  const ie = formatIonizationEnergy(el.firstIonizationEnergy);
  const ph = formatPhase(el.phase);
  const cat = el.category || 'UNKNOWN';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 632 224" width="632" height="224" role="img">
  <rect width="632" height="224" fill="#0f141b"/>
  <circle cx="112" cy="120" r="72" fill="none" stroke="#8dd4c6" stroke-width="2"/>
  <circle cx="112" cy="120" r="56" fill="none" stroke="#edc777" stroke-width="1" opacity="0.4"/>
  <text x="112" y="80" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#8dd4c6">Z = ${el.z}</text>
  <text x="112" y="136" text-anchor="middle" font-family="Georgia,serif" font-size="64" font-weight="700" fill="#e8edf3">${el.symbol}</text>
  <text x="112" y="168" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#9aa7b8">${el.name}</text>
  <rect x="240" y="56" width="360" height="128" rx="8" fill="#161d27" stroke="#26313f"/>
  <text x="260" y="84" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#6cb2ff">Atomic Identity</text>
  <text x="260" y="106" font-family="system-ui,sans-serif" font-size="11" fill="#9aa7b8">Category: ${cat}</text>
  <text x="260" y="124" font-family="system-ui,sans-serif" font-size="11" fill="#9aa7b8">Phase (STP): ${ph}  ·  Weight: ${aw}</text>
  <text x="260" y="142" font-family="system-ui,sans-serif" font-size="11" fill="#9aa7b8">I1: ${ie}  ·  Group: ${el.group || '?'}  ·  Period: ${el.period}  ·  Block: ${el.block}</text>
  <text x="260" y="166" font-family="Consolas,monospace" font-size="12" fill="#edc777">${ec}</text>
  <text x="16" y="210" font-family="system-ui,sans-serif" font-size="10" fill="#555">${matId} · IUPAC 2021 + NIST ASD</text>
</svg>`;
}

// Generate master YAML
function generateMasterYAML(el) {
  const matId = `MAT:${pad4(el.z)}`;
  const now = new Date().toISOString().split('T')[0];
  const ec = formatElectronConfig(el.electronConfiguration);
  const aw = formatAtomicWeight(el.atomicWeight);
  const ie = formatIonizationEnergy(el.firstIonizationEnergy);
  const en = formatElectronegativity(el.electronegativity);
  const ph = formatPhase(el.phase);

  return `registry_id: "${matId}:REG:MASTER"
record_id: "${matId}"
record_version: "1.0.0"
created: "${now}"
updated: "${now}"
status: BASELINE
record_class: CHEMICAL_ELEMENT
schema_version: "1.0.0"

identity:
  canonical_name: "${el.name}"
  symbol: "${el.symbol}"
  atomic_number: ${el.z}
  mat_id: "${matId}"
  period: ${el.period}
  group: ${el.group || 'null'}
  block: "${el.block}"
  category: "${el.category}"

properties:
  atomic_weight:
    value: ${aw}
    source: "IUPAC"
    evidence: "MEASURED"
  electron_configuration:
    value: "${ec}"
    source: "NIST"
    evidence: "MEASURED"
  electronegativity:
    value: ${en}
    source: "Pauling Scale"
    evidence: "MEASURED"
  first_ionization_energy:
    value: ${ie}
    source: "NIST ASD"
    evidence: "MEASURED"
  phase_at_stp:
    value: "${ph}"
    source: "IUPAC"
    evidence: "MEASURED"
  melting_point:
    value: null
    null_reason: "BASELINE_DATA_NOT_YET_CURATED"
    source: null
  boiling_point:
    value: null
    null_reason: "BASELINE_DATA_NOT_YET_CURATED"
    source: null
  density:
    value: null
    null_reason: "BASELINE_DATA_NOT_YET_CURATED"
    source: null

nuclear:
  status: PLANNED

quantum:
  status: PLANNED

spectra:
  status: PLANNED

electrical:
  status: PLANNED

magnetic:
  status: PLANNED

thermal:
  status: PLANNED

mechanical:
  status: PLANNED

chemical:
  status: PLANNED

materials:
  status: PLANNED

processes:
  status: PLANNED

environment:
  status: PLANNED

applications:
  status: PLANNED

safety:
  status: PLANNED

completeness:
  identity: CURATED
  nuclear: PLANNED
  quantum: PLANNED
  spectral: PLANNED
  electrical: PLANNED
  magnetic: PLANNED
  thermal: PLANNED
  mechanical: PLANNED
  chemical: PLANNED
  materials: PLANNED
  process: PLANNED
  environment: PLANNED
  applications: PLANNED
  safety: PLANNED
  sources: PLANNED
  visuals: PLANNED
`;
}

// Generate visual manifest
function generateVisualManifest(el) {
  const matId = `MAT:${pad4(el.z)}`;
  const prefix = `${pad4(el.z)}-${el.name}-${el.symbol}`;

  return `registry_id: "${matId}:REG:VISUALS"
record_id: "${matId}"
manifest_version: "1.0.0"

visuals:
  V01:
    asset_id: "${matId}:FIG:V01:001"
    filename: "${prefix}-FIG-001-Natural-Material-State.png"
    path: "images/natural/"
    status: "SOURCE-IMAGE-REQUIRED"

  V02:
    asset_id: "${matId}:FIG:V02:001"
    filename: "${prefix}-FIG-002-Atomic-Identity.svg"
    path: "images/scientific/"
    status: "GENERATED"

  V03:
    asset_id: "${matId}:DIAGRAM:V03:001"
    filename: "${prefix}-DIAGRAM-001-Bonding.svg"
    path: "diagrams/bonding/"
    status: "STATUS-REQUIRED"

  V04:
    asset_id: "${matId}:FIG:V04:001"
    filename: "${prefix}-FIG-003-Energy-Level-Structure.svg"
    path: "images/quantum/"
    status: "STATUS-REQUIRED"

  V05:
    asset_id: "${matId}:FIG:V05:001"
    filename: "${prefix}-FIG-004-Isotope-Map.svg"
    path: "images/isotope/"
    status: "STATUS-REQUIRED"

  V06:
    asset_id: "${matId}:FIG:V06:001"
    filename: "${prefix}-FIG-005-Spectral-Fingerprint.svg"
    path: "images/spectral/"
    status: "STATUS-REQUIRED"

  V07:
    asset_id: "${matId}:FIG:V07:001"
    filename: "${prefix}-FIG-006-Physical-Property-Dashboard.svg"
    path: "images/properties/"
    status: "STATUS-REQUIRED"

  V08:
    asset_id: "${matId}:DIAGRAM:V08:001"
    filename: "${prefix}-DIAGRAM-002-Charge-and-Electrical-State.svg"
    path: "diagrams/fields/"
    status: "STATUS-REQUIRED"

  V09:
    asset_id: "${matId}:DIAGRAM:V09:001"
    filename: "${prefix}-DIAGRAM-003-Magnetic-Spin-Field-State.svg"
    path: "diagrams/fields/"
    status: "STATUS-REQUIRED"

  V10:
    asset_id: "${matId}:DIAGRAM:V10:001"
    filename: "${prefix}-DIAGRAM-004-Thermal-Phase-Diagram.svg"
    path: "diagrams/processes/"
    status: "STATUS-REQUIRED"

  V11:
    asset_id: "${matId}:DIAGRAM:V11:001"
    filename: "${prefix}-DIAGRAM-005-Mechanical-State.svg"
    path: "diagrams/processes/"
    status: "STATUS-REQUIRED"

  V12:
    asset_id: "${matId}:DIAGRAM:V12:001"
    filename: "${prefix}-DIAGRAM-006-Phase-Environment.svg"
    path: "diagrams/processes/"
    status: "STATUS-REQUIRED"

  V13:
    asset_id: "${matId}:DIAGRAM:V13:001"
    filename: "${prefix}-DIAGRAM-007-Process-Flow.svg"
    path: "diagrams/processes/"
    status: "STATUS-REQUIRED"

  V14:
    asset_id: "${matId}:DIAGRAM:V14:001"
    filename: "${prefix}-DIAGRAM-008-Relationship-Network.svg"
    path: "diagrams/relationships/"
    status: "STATUS-REQUIRED"

  V15:
    asset_id: "${matId}:FIG:V15:001"
    filename: "${prefix}-FIG-007-Scientific-3D-Model.glb"
    path: "models/scientific/"
    status: "STATUS-REQUIRED"

  V16:
    asset_id: "${matId}:FIG:V16:001"
    filename: "${prefix}-FIG-008-Data-Extruded-3D-Model.glb"
    path: "models/data-extruded/"
    status: "STATUS-REQUIRED"

  V17:
    asset_id: "${matId}:FIG:V17:001"
    filename: "${prefix}-FIG-009-Applications.svg"
    path: "images/applications/"
    status: "STATUS-REQUIRED"

  V18:
    asset_id: "${matId}:FIG:V18:001"
    filename: "${prefix}-FIG-010-3D-Printable.glb"
    path: "models/printable/"
    status: "STATUS-REQUIRED"
`;
}

// Generate graph manifest
function generateGraphManifest(el) {
  const matId = `MAT:${pad4(el.z)}`;
  const prefix = `${pad4(el.z)}-${el.name}-${el.symbol}`;

  return `record_id: "${matId}"
manifest_id: "${matId}:REG:GRAPHS"
version: "1.0.0"

graphs:
  - graph_id: "${matId}:GRAPH:001"
    filename: "${prefix}-GRAPH-001-Isotope-Lifetime-Map.svg"
    data_filename: "${prefix}-GRAPH-001-Isotope-Lifetime-Map.csv"
    title: "${el.name} Isotope Stability and Lifetime"
    status: "DATASET-REQUIRED"
    source_ids: []

  - graph_id: "${matId}:GRAPH:002"
    filename: "${prefix}-GRAPH-002-Atomic-Energy-Levels.svg"
    data_filename: "${prefix}-GRAPH-002-Atomic-Energy-Levels.csv"
    title: "Selected Atomic ${el.name} Energy Levels"
    status: "DATASET-REQUIRED"
    source_ids: []

  - graph_id: "${matId}:GRAPH:003"
    filename: "${prefix}-GRAPH-003-Atomic-Emission-Spectrum.svg"
    data_filename: "${prefix}-GRAPH-003-Atomic-Emission-Spectrum.csv"
    title: "Atomic ${el.name} Emission Spectrum"
    status: "DATASET-REQUIRED"
    source_ids: []

  - graph_id: "${matId}:GRAPH:004"
    filename: "${prefix}-GRAPH-004-Ionization-Energy.svg"
    data_filename: "${prefix}-GRAPH-004-Ionization-Energy.csv"
    title: "${el.name} Ionization Energy"
    status: "DATASET-REQUIRED"
    source_ids: []

  - graph_id: "${matId}:GRAPH:005"
    filename: "${prefix}-GRAPH-005-Electronegativity-Trend.svg"
    data_filename: "${prefix}-GRAPH-005-Electronegativity-Trend.csv"
    title: "${el.name} Electronegativity Trend"
    status: "DATASET-REQUIRED"
    source_ids: []

  - graph_id: "${matId}:GRAPH:006"
    filename: "${prefix}-GRAPH-006-Atomic-Radius-Trend.svg"
    data_filename: "${prefix}-GRAPH-006-Atomic-Radius-Trend.csv"
    title: "${el.name} Atomic Radius Trend"
    status: "DATASET-REQUIRED"
    source_ids: []

  - graph_id: "${matId}:GRAPH:007"
    filename: "${prefix}-GRAPH-007-Phase-Diagram.svg"
    data_filename: "${prefix}-GRAPH-007-Phase-Diagram.csv"
    title: "${el.name} Phase Diagram"
    status: "DATASET-REQUIRED"
    source_ids: []

  - graph_id: "${matId}:GRAPH:008"
    filename: "${prefix}-GRAPH-008-Abundance-Comparison.svg"
    data_filename: "${prefix}-GRAPH-008-Abundance-Comparison.csv"
    title: "${el.name} Abundance Comparison"
    status: "DATASET-REQUIRED"
    source_ids: []
`;
}

// Generate table manifest
function generateTableManifest(el) {
  const matId = `MAT:${pad4(el.z)}`;
  const prefix = `${pad4(el.z)}-${el.name}-${el.symbol}`;

  return `record_id: "${matId}"
manifest_id: "${matId}:REG:TABLES"
version: "1.0.0"

tables:
  - table_id: "${matId}:TABLE:001"
    filename: "${prefix}-Isotope-Table.md"
    title: "${el.name} Isotopes"
    status: "PLANNED"

  - table_id: "${matId}:TABLE:002"
    filename: "${prefix}-TABLE-002-Atomic-Identity.md"
    title: "Atomic Identity and Ground-State Properties"
    status: "PLANNED"

  - table_id: "${matId}:TABLE:003"
    filename: "${prefix}-TABLE-003-Charge-States.md"
    title: "${el.name} Charge States"
    status: "PLANNED"

  - table_id: "${matId}:TABLE:004"
    filename: "${prefix}-TABLE-004-Spectral-Transitions.md"
    title: "Selected ${el.name} Spectral Transitions"
    status: "PLANNED"

  - table_id: "${matId}:TABLE:005"
    filename: "${prefix}-TABLE-005-Spectroscopic-Constants.md"
    title: "${el.name} Spectroscopic Constants"
    status: "PLANNED"

  - table_id: "${matId}:TABLE:006"
    filename: "${prefix}-TABLE-006-Phase-Reference-Points.md"
    title: "${el.name} Phase Reference Points"
    status: "PLANNED"

  - table_id: "${matId}:TABLE:007"
    filename: "${prefix}-TABLE-007-Process-Matrix.md"
    title: "${el.name} Process Matrix"
    status: "PLANNED"

  - table_id: "${matId}:TABLE:008"
    filename: "${prefix}-TABLE-008-Material-Interactions.md"
    title: "${el.name} Material Interactions"
    status: "PLANNED"

  - table_id: "${matId}:TABLE:009"
    filename: "${prefix}-TABLE-009-Evidence-and-Sources.md"
    title: "${el.name} Evidence and Source Matrix"
    status: "PLANNED"
`;
}

// Generate processes YAML
function generateProcessesYAML(el) {
  const matId = `MAT:${pad4(el.z)}`;

  return `record_id: "${matId}"
manifest_id: "${matId}:REG:PROCESSES"
version: "1.0.0"

processes: []
`;
}

// Generate experiments YAML
function generateExperimentsYAML(el) {
  const matId = `MAT:${pad4(el.z)}`;

  return `record_id: "${matId}"
manifest_id: "${matId}:REG:EXPERIMENTS"
version: "1.0.0"

experiments: []
`;
}

// Generate relationships YAML
function generateRelationshipsYAML(el) {
  const matId = `MAT:${pad4(el.z)}`;

  return `record_id: "${matId}"
manifest_id: "${matId}:REG:RELATIONSHIPS"
version: "1.0.0"

relationships: []
`;
}

// Generate sources YAML
function generateSourcesYAML(el) {
  const matId = `MAT:${pad4(el.z)}`;

  return `record_id: "${matId}"
manifest_id: "${matId}:REG:SOURCES"
version: "1.0.0"

sources:
  - id: "IUPAC"
    name: "International Union of Pure and Applied Chemistry"
    notes: "Standard atomic weights 2021"
  - id: "NIST ASD"
    name: "NIST Atomic Spectra Database"
    notes: "Ionization energies, electron configurations"
`;
}

// Generate chapter markdown
function generateChapterMarkdown(el) {
  const matId = `MAT:${pad4(el.z)}`;
  const prefix = `${pad4(el.z)}-${el.name}-${el.symbol}`;
  const now = new Date().toISOString().split('T')[0];
  const ec = formatElectronConfig(el.electronConfiguration);
  const aw = formatAtomicWeight(el.atomicWeight);
  const ie = formatIonizationEnergy(el.firstIonizationEnergy);
  const en = formatElectronegativity(el.electronegativity);
  const ph = formatPhase(el.phase);

  return `# ${el.z} — ${el.name}

\`\`\`yaml
mat_id: "${matId}"
record_name: "${el.name}"
symbol: "${el.symbol}"
record_class: CHEMICAL_ELEMENT
parent_id: "MAT:0000"
schema_version: "1.0.0"
record_version: "1.0.0"
status: BASELINE
created: "${now}"
updated: "${now}"
contributors: []
\`\`\`

---

# 0. Record Navigation

## Parent

MAT:0000 — Origin State

## Child Records

None yet.

## Related Records

None yet.

---

# 1. Identity

| Field | Value | Unit / Status | Source |
|---|---|---|---|
| Canonical name | ${el.name} | | IUPAC |
| Symbol | ${el.symbol} | | IUPAC |
| Record class | CHEMICAL_ELEMENT | | MAT |
| Atomic number | ${el.z} | | IUPAC |
| Standard atomic weight | ${aw} | | IUPAC |
| Period | ${el.period} | | IUPAC |
| Group | ${el.group || 'N/A'} | | IUPAC |
| Block | ${el.block} | | IUPAC |
| Category | ${el.category} | | IUPAC |

---

# 2. Executive Scientific Summary

${el.name} (${el.symbol}, Z = ${el.z}) is a ${el.category.toLowerCase()} in period ${el.period}${el.group ? `, group ${el.group}` : ''} of the periodic table.

**Status:** Baseline element record — awaiting curated MAT expansion.

---

# 3. Natural State and Manifestation

\`\`\`html
<!-- MAT-VISUAL: V01 -->
<!-- ASSET-ID: ${matId}:FIG:V01:001 -->
<!-- STATUS: SOURCE-IMAGE-REQUIRED -->
\`\`\`

Describe physical state, appearance, occurrence.

---

# 4. Conventional Scientific Representation

\`\`\`html
<!-- MAT-VISUAL: V02 -->
\`\`\`

Include symbol, atomic/molecular representation.

---

# 5. Atomic / Molecular / Crystal Structure

\`\`\`html
<!-- MAT-VISUAL: V03 -->
\`\`\`

Bond network, coordination, lattice, space group.

---

# 6. Quantum and Electronic Structure

\`\`\`html
<!-- MAT-VISUAL: V04 -->
\`\`\`

Electronic configuration: **${ec}**

---

# 7. Isotopes and Nuclear States

\`\`\`html
<!-- MAT-VISUAL: V05 -->
\`\`\`

| Isotope | Protons | Neutrons | Stability | Half-Life | Abundance |
|---|---:|---:|---|---|---|

---

# 8. Spectra, Frequency and Resonance

\`\`\`html
<!-- MAT-VISUAL: V06 -->
\`\`\`

Electronic, vibrational, rotational, Raman, hyperfine, nuclear, magnetic resonance, acoustic, plasma.

---

# 9. Physical Properties

| Property | Value | Unit | Conditions | Evidence | Source |
|---|---:|---|---|---|---|
| Atomic weight | ${aw} | u | STP | MEASURED | IUPAC |
| First ionization energy | ${ie} | | | MEASURED | NIST ASD |
| Electronegativity | ${en} | | | MEASURED | Pauling Scale |
| Phase at STP | ${ph} | | | MEASURED | IUPAC |

---

# 10. Electrical Properties

\`\`\`html
<!-- MAT-VISUAL: V08 -->
\`\`\`

Conductivity, resistivity, permittivity, dielectric loss.

---

# 11. Magnetic Properties

\`\`\`html
<!-- MAT-VISUAL: V09 -->
\`\`\`

Susceptibility, ordering, permeability, magnetic moments.

---

# 12. Thermal and Thermodynamic Properties

\`\`\`html
<!-- MAT-VISUAL: V10 -->
\`\`\`

Melting, boiling, heat capacity, conductivity, diffusivity.

---

# 13. Mechanical Properties

\`\`\`html
<!-- MAT-VISUAL: V11 -->
\`\`\`

Modulus, strength, hardness, toughness, creep, fatigue.

---

# 14. Phase, Pressure and Environment

\`\`\`html
<!-- MAT-VISUAL: V12 -->
\`\`\`

Phase transitions, pressure dependence, environmental stability.

---

# 15. Chemical Behaviour

Oxidation states, common bonding, reactivity, redox, acids/bases, corrosion, solubility.

---

# 16. Compounds and Materials

\`\`\`text
FORMS-COMPOUND
CONSTITUENT-OF
FORMS-ALLOTROPE
USED-IN-MATERIAL
\`\`\`

---

# 17. Processes and Transformations

\`\`\`html
<!-- MAT-VISUAL: V13 -->
\`\`\`

---

# 18. Energy

Generation, storage, transport, conversion.

---

# 19. Biological Context

Scientifically supported biological relationships only.

---

# 20. Environment and Sustainability

Occurrence, extraction, abundance, recycling, environmental fate, supply risk.

---

# 21. Applications

\`\`\`html
<!-- MAT-VISUAL: V17 -->
\`\`\`

\`\`\`text
COMMERCIAL
DEMONSTRATED
RESEARCH
PROPOSED
HYPOTHETICAL
\`\`\`

---

# 22. Safety

Chemical, thermal, pressure, electrical, magnetic, radiation, biological, environmental hazards.

---

# 23. Time Dependence

Decay, ageing, corrosion, fatigue, relaxation, degradation.

---

# 24. Scale Dependence

\`\`\`text
ATOMIC
MOLECULAR
NANO
MICRO
MACRO
BULK
\`\`\`

---

# 25. Geometry Effects

Thickness, orientation, shape, surface area, topology.

---

# 26. Relationships

\`\`\`html
<!-- MAT-VISUAL: V14 -->
\`\`\`

---

# 27. Scientific 3D Model

\`\`\`html
<!-- MAT-VISUAL: V15 -->
\`\`\`

---

# 28. MAT Data-Extruded 3D Model

\`\`\`html
<!-- MAT-VISUAL: V16 -->
\`\`\`

---

# 29. Equations and Governing Principles

| Property / Process | Principle IDs |
|---|---|
| | |

---

# 30. Calculations

---

# 31. Experiments and Replication

---

# 32. Evidence and Confidence

\`\`\`yaml
evidence_status: BASELINE
confidence: U
replication: NOT-ASSESSED
unresolved_conflicts: []
\`\`\`

---

# 33. Sources

\`\`\`text
sources/
\`\`\`

---

# 34. People and Intellectual Lineage

---

# 35. Open Questions

---

# 36. MAT / Causali E Research Notes

\`\`\`text
HYPOTHESIS
SPECULATION
TESTABLE
SUPPORTED
NOT-SUPPORTED
\`\`\`

---

# 37. Completeness

\`\`\`yaml
identity: CURATED
nuclear: PLANNED
quantum: PLANNED
spectral: PLANNED
electrical: PLANNED
magnetic: PLANNED
thermal: PLANNED
mechanical: PLANNED
chemical: PLANNED
materials: PLANNED
process: PLANNED
environment: PLANNED
applications: PLANNED
safety: PLANNED
sources: PLANNED
visuals: PLANNED
\`\`\`

---

# 38. Revision History

| Version | Date | Change |
|---|---|---|
| 1.0.0 | ${now} | Baseline record generated from IUPAC 2021 + NIST ASD |
`;
}

// Main generation loop
let generated = 0;
let skipped = 0;

for (const el of baseline.elements) {
  if (CURATED.has(el.z)) {
    skipped++;
    continue;
  }

  const dir = elementDir(el);
  const prefix = `${pad4(el.z)}-${el.name}-${el.symbol}`;

  // Create directory structure
  ensureDir(dir);
  ensureDir(join(dir, 'data', 'structured'));
  ensureGitKeep(join(dir, 'data', 'isotopes'));
  ensureGitKeep(join(dir, 'data', 'properties'));
  ensureGitKeep(join(dir, 'data', 'phases'));
  ensureGitKeep(join(dir, 'data', 'spectra'));
  ensureGitKeep(join(dir, 'diagrams', 'bonding'));
  ensureGitKeep(join(dir, 'diagrams', 'fields'));
  ensureGitKeep(join(dir, 'diagrams', 'processes'));
  ensureGitKeep(join(dir, 'diagrams', 'relationships'));
  ensureGitKeep(join(dir, 'images', 'natural'));
  ensureDir(join(dir, 'images', 'scientific'));
  ensureGitKeep(join(dir, 'images', 'quantum'));
  ensureGitKeep(join(dir, 'images', 'spectral'));
  ensureGitKeep(join(dir, 'images', 'properties'));
  ensureGitKeep(join(dir, 'images', 'applications'));
  ensureGitKeep(join(dir, 'images', 'isotope'));
  ensureGitKeep(join(dir, 'graphs'));
  ensureDir(join(dir, 'models', 'scientific'));
  ensureDir(join(dir, 'models', 'data-extruded'));
  ensureDir(join(dir, 'models', 'printable'));
  ensureGitKeep(join(dir, 'tables'));
  ensureGitKeep(join(dir, 'calculations'));
  ensureDir(join(dir, 'experiments'));
  ensureDir(join(dir, 'relationships'));
  ensureDir(join(dir, 'sources'));

  // Write files
  writeIfNew(join(dir, `${prefix}.md`), generateChapterMarkdown(el));
  writeIfNew(join(dir, 'data', 'structured', `${prefix}.yaml`), generateMasterYAML(el));
  writeIfNew(join(dir, 'data', 'structured', `${prefix}-Visual-Manifest.yaml`), generateVisualManifest(el));
  writeIfNew(join(dir, 'data', 'structured', `${prefix}-Graph-Manifest.yaml`), generateGraphManifest(el));
  writeIfNew(join(dir, 'data', 'structured', `${prefix}-Table-Manifest.yaml`), generateTableManifest(el));
  writeIfNew(join(dir, 'data', 'structured', `${prefix}-Processes-and-Environments.yaml`), generateProcessesYAML(el));
  writeIfNew(join(dir, 'images', 'scientific', `${prefix}-FIG-002-Atomic-Identity.svg`), generateSVG(el));
  writeIfNew(join(dir, 'experiments', `${prefix}-Experiments.yaml`), generateExperimentsYAML(el));
  writeIfNew(join(dir, 'relationships', `${prefix}-Relationships.yaml`), generateRelationshipsYAML(el));
  writeIfNew(join(dir, 'sources', `${prefix}-Sources.yaml`), generateSourcesYAML(el));

  generated++;
  process.stdout.write(`\r  Generated: ${generated} / ${118 - CURATED.size} (skipped ${skipped} curated)`);
}

console.log(`\n\nDone! Generated ${generated} element records, skipped ${skipped} curated.`);
console.log(`Records directory: ${RECORDS_DIR}`);
