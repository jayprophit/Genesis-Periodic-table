// Pass 7: O + F spec-named visuals. Record values only; bounds stay bounds.
// Run: node book/generate-pass7.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = join(import.meta.dirname, "..");
const R = (p) => readFileSync(join(root, p), "utf8").replace(/\r\n/g, "\n");
const F = (re, t, label) => { const m = t.match(re); if (!m) throw new Error("missing: " + label); return m[1]; };
const CSS = 'font-family="system-ui,sans-serif"';
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const head = (w, h, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"><rect width="${w}" height="${h}" fill="#0f141b"/><text x="16" y="28" ${CSS} font-size="16" font-weight="700" fill="#e8edf3">${esc(title)}</text>`;
const cap = (t, w, h) => `<text x="16" y="${h - 10}" ${CSS} font-size="10" fill="#5c6b80">${esc(t)}</text></svg>`;
function cards(title, items, caption, cols = 3) {
  const cw = 210, ch = 64, L = 16, T = 52;
  const W = L * 2 + cols * cw, H = T + 14 + Math.ceil(items.length / cols) * ch + 30;
  let s = head(W, H, title);
  items.forEach(([h, sub], k) => {
    const x = L + (k % cols) * cw, y = T + Math.floor(k / cols) * ch;
    s += `<rect x="${x + 4}" y="${y + 4}" width="${cw - 8}" height="${ch - 8}" rx="8" fill="#161d27" stroke="#26313f"/>`;
    s += `<text x="${x + 14}" y="${y + 28}" ${CSS} font-size="13" font-weight="700" fill="#6cb2ff">${esc(h)}</text>`;
    s += `<text x="${x + 14}" y="${y + 46}" ${CSS} font-size="10" fill="#9aa7b8">${esc(sub).slice(0, 34)}</text>`;
  });
  return s + cap(caption, W, H);
}
function flow(title, nodes, caption) {
  const W = 580, bh = 44, gap = 26, L = 60, T = 56;
  const H = T + nodes.length * (bh + gap) + 30;
  let s = head(W, H, title);
  nodes.forEach((n, k) => {
    const y = T + k * (bh + gap);
    s += `<rect x="${L}" y="${y}" width="${W - L * 2}" height="${bh}" rx="8" fill="#161d27" stroke="#26313f"/>`;
    s += `<text x="${W / 2}" y="${y + 27}" ${CSS} font-size="12" fill="#e8edf3" text-anchor="middle">${esc(n)}</text>`;
    if (k) s += `<line x1="${W / 2}" y1="${y - gap}" x2="${W / 2}" y2="${y}" stroke="#6cb2ff"/><polygon points="${W / 2 - 5},${y - 8} ${W / 2 + 5},${y - 8} ${W / 2},${y}" fill="#6cb2ff"/>`;
  });
  return s + cap(caption, W, H);
}
const Wf = (p, c) => { writeFileSync(join(root, p), c); console.log("wrote " + p); };
const csv = (p, c) => { writeFileSync(join(root, p), c); };

// ================= OXYGEN =================
const O = "records/0008-Oxygen-O";
const oYaml = R(`${O}/data/structured/0008-Oxygen-O.yaml`);
const oIso = R(`${O}/data/isotopes/0008-Oxygen-O-Isotopes.yaml`);
const oRel = R(`${O}/relationships/0008-Oxygen-O-Relationships.yaml`);

Wf(`${O}/images/scientific/0008-Oxygen-O-FIG-002-Atomic-Identity.svg`,
  cards("Oxygen atomic identity (MAT:0008)", [
    ["O · Z = 8", "1s2 2s2 2p4 · 3P2"],
    ["[15.99903, 15.99977]", "weight interval"],
    ["I1 = 13.618055 eV", "SRC-000005"],
    ["open-shell atom", "≠ paired O2"],
    ["group 16 p-block", "chalcogen"],
    ["O2 triplet", "paramagnetic gas"],
  ], "Atomic ≠ molecular magnetism.", 3));

Wf(`${O}/diagrams/bonding/0008-Oxygen-O-DIAGRAM-001-O2-Molecular-Orbitals.svg`,
  cards("O2 molecular orbitals", [
    ["X3Σg− ground", "two π* electrons"],
    ["triplet spin", "paramagnetic"],
    ["re = 1.20752 Å", "SRC-000127"],
    ["ωe 1580.193", "cm−1 vibration"],
  ], "MO occupancy → spin → magnetism.", 2));
Wf(`${O}/diagrams/bonding/0008-Oxygen-O-DIAGRAM-002-O2-O3-Geometry.svg`,
  cards("O2 linear vs O3 bent", [
    ["O2 180°", "r = 1.20752 Å"],
    ["O3 116.8°", "r = 1.278 Å, C2v"],
    ["1103/701/1042", "O3 cm−1 modes"],
    ["same atoms", "different molecule"],
  ], "SRC-000130.", 2));

Wf(`${O}/images/quantum/0008-Oxygen-O-FIG-003-Atomic-Electron-Probability.svg`,
  cards("O electron structure", [
    ["1s2 core", "tightly bound"],
    ["2s2 2p4", "open shell"],
    ["I1–I8 ladder", "13.62→871.4 eV"],
    ["qualifiers kept", "brackets/parens"],
  ], "NIST ASD ladder.", 2));
Wf(`${O}/images/quantum/0008-Oxygen-O-FIG-004-O2-Spin-State.svg`,
  cards("O2 spin states", [
    ["X3Σg− triplet", "ground, reactive"],
    ["a1Δg singlet", "+7918.1 cm−1"],
    ["≈0.982 eV gap", "excited chemistry"],
    ["same formula", "new reactivity"],
  ], "Electronic state is data.", 2));

{
  const rows = [...oIso.matchAll(/isotope_id: "MAT:0008:ISO:O-(\d+)"\n    mass_number: \d+\n    protons: 8\n    neutrons: (\d+)/g)].map((m) => [m[1], m[2]]);
  if (rows.length !== 17) throw new Error("O rows " + rows.length);
  const st = { 12: "p-unbound 8.9zs", 13: "8.58 ms β+", 14: "70.621 s β+", 15: "122.266 s PET", 16: "STABLE", 17: "STABLE NMR", 18: "STABLE tracer", 19: "26.470 s", 20: "13.51 s", 21: "3.42 s", 22: "2.25 s", 23: "97 ms", 24: "77.4 ms edge", 25: "5.18 zs", 26: "4.2 ps 2n", 27: "2023 3n-net", 28: "2023 4n-net" };
  Wf(`${O}/images/isotope/0008-Oxygen-O-FIG-005-Isotope-Map.svg`,
    cards("O isotopes 12O–28O", rows.map(([a, n]) => [`${a}O · ${n}n`, st[+a]]),
      "27O/28O observed 2023; NUBASE kept as history.", 4));
  const Wd = 640, H = 560, L = 110, Rm = 40, T = 52;
  const pts = { 12: 8.9e-21, 13: 0.00858, 14: 70.621, 15: 122.266, 19: 26.47, 20: 13.51, 21: 3.42, 22: 2.25, 23: 0.097, 24: 0.0774, 25: 5.18e-21, 26: 4.2e-12 };
  const lo = -21, hi = 2.5;
  const X = (v) => L + ((Math.log10(v) - lo) / (hi - lo)) * (Wd - L - Rm);
  let s = head(Wd, H, "O isotope lifetimes (log s; selection)");
  const order = [[12, "12O"], [13, "13O"], [14, "14O"], [15, "15O"], [16, "16O STABLE"], [17, "17O STABLE"], [18, "18O STABLE"], [19, "19O"], [20, "20O"], [21, "21O"], [22, "22O"], [23, "23O"], [24, "24O edge"], [25, "25O"], [26, "26O"], [27, "27O 2023"], [28, "28O 2023"]];
  order.forEach(([a, lb], k) => {
    const y = T + 18 + k * 27;
    s += `<text x="${L - 8}" y="${y + 4}" ${CSS} font-size="11" fill="#e8edf3" text-anchor="end">${lb}</text>`;
    s += `<line x1="${L}" y1="${y}" x2="${Wd - Rm}" y2="${y}" stroke="#26313f"/>`;
    if (pts[a]) s += `<circle cx="${X(pts[a]).toFixed(1)}" cy="${y}" r="5" fill="#6cb2ff"/>`;
    else s += `<text x="${L + 4}" y="${y - 5}" ${CSS} font-size="10" fill="#e0a100">RESONANCE / STABLE</text>`;
  });
  s += cap("NUBASE2020 + 2023 Nature override (SRC-000132).", Wd, H);
  Wf(`${O}/graphs/0008-Oxygen-O-GRAPH-001-Isotope-Lifetime-Map.svg`, s);
  csv(`${O}/graphs/data/0008-Oxygen-O-GRAPH-001-Isotope-Lifetime-Map.csv`, "isotope,half_life_s,note\n12O,8.9e-21,\n13O,0.00858,\n14O,70.621,\n15O,122.266,\n16O,,STABLE\n17O,,STABLE\n18O,,STABLE\n19O,26.47,\n20O,13.51,\n21O,3.42,\n22O,2.25,\n23O,0.097,\n24O,0.0774,DRIP-EDGE\n25O,5.18e-21,\n26O,4.2e-12,\n27O,,OBSERVED-2023\n28O,,OBSERVED-2023\n");
}

Wf(`${O}/images/spectral/0008-Oxygen-O-FIG-006-Auroral-Atomic-Spectrum.svg`,
  cards("Auroral O lines (forbidden)", [
    ["557.734 nm", "1S0→1D2, E2 green"],
    ["630.0304 nm", "1D2→3P2, M1 red"],
    ["636.3776 nm", "1D2→3P1, M1 red"],
    ["forbidden ≠", "impossible (thin gas)"],
  ], "SRC-000143. Metastable states.", 2));
Wf(`${O}/images/spectral/0008-Oxygen-O-FIG-007-Molecular-Spectrum.svg`,
  cards("O molecular spectra", [
    ["O2 vib 1580", "cm−1 ωe"],
    ["O2 rot 1.44", "cm−1 Be"],
    ["singlet +7918", "cm−1 gap"],
    ["O3 1103/701", "+1042 cm−1"],
    ["17O NMR", "I=5/2 probe"],
  ], "NO UNIVERSAL O FREQUENCY.", 3));

Wf(`${O}/images/properties/0008-Oxygen-O-FIG-008-State-Dashboard.svg`,
  cards("O states need cards", [
    ["O atom", "open-shell reactive"],
    ["O2 gas", "triplet, 20.9% air"],
    ["LOX 90.188 K", "paramagnetic fluid"],
    ["O3 bent", "UV chemistry"],
    ["oxides", "V_O first-class"],
  ], "State-resolved only.", 3));
Wf(`${O}/diagrams/fields/0008-Oxygen-O-DIAGRAM-003-Oxide-Ion-Transport.svg`,
  flow("O2− transport (SOFC)", ["O2 cathode in", "cathodic reduction", "O2− hopping (V_O)", "anode oxidation"], "Vacancies enable, not decorate."));
Wf(`${O}/diagrams/fields/0008-Oxygen-O-DIAGRAM-004-Battery-Oxygen-Redox.svg`,
  cards("Battery O redox", [
    ["lattice O2−", "oxidizable host O"],
    ["trapped O2", "nanovoid product"],
    ["voltage fade", "reversibility loss"],
    ["host-specific", "never generic"],
  ], "SRC-000137.", 2));
Wf(`${O}/diagrams/fields/0008-Oxygen-O-DIAGRAM-005-O2-Paramagnetism.svg`,
  cards("O2 paramagnetism", [
    ["π* two e−", "unpaired triplet"],
    ["MO explains", "not Lewis alone"],
    ["LOX demo", "magnet pull"],
    ["≠ ferro", "no domains"],
  ], "SRC-000005/127.", 2));
Wf(`${O}/diagrams/fields/0008-Oxygen-O-DIAGRAM-006-Solid-Oxygen-Magnetism.svg`,
  cards("Solid O2 magnetism", [
    ["α antiferro", "ordered, cold"],
    ["β/γ molecular", "state-dependent"],
    ["δ multi-order", "~5.5 GPa+"],
    ["ε collapse", "O8 cluster"],
  ], "SRC-000144/145.", 2));
Wf(`${O}/images/properties/0008-Oxygen-O-FIG-009-Cryogenic-Oxygen.svg`,
  cards("O cryogenics", [
    ["Tm 54.36 K", "solid forms"],
    ["Tb 90.188 K", "normal boiling"],
    ["Tc 154.58 K", "Pc 5.043 MPa"],
    ["LOX oxidizer", "≠ fuel"],
  ], "SRC-000129/133.", 2));
Wf(`${O}/images/properties/0008-Oxygen-O-FIG-010-Oxide-Vacancy-Architecture.svg`,
  flow("Vacancy as variable", ["perfect lattice", "remove O → V_O", "charge/carrier shift", "transport/magnetism change"], "VACANCY ≠ MISSING DATA."));
Wf(`${O}/diagrams/processes/0008-Oxygen-O-DIAGRAM-007-Transformation-Network.svg`,
  flow("O transformation network", ["O2 + hν → 2O", "O+O2+M → O3", "cool → LOX/solids", "H → H2O", "metals → oxides", "biology ⇄ cycle", "pressure → dense phases"], "Branches stay typed."));
{
  const types = [...new Set([...oRel.matchAll(/type: "([A-Z0-9-]+)"/g)].map((m) => m[1]))];
  Wf(`${O}/diagrams/relationships/0008-Oxygen-O-DIAGRAM-008-Knowledge-Graph.svg`,
    flow("MAT:0008 knowledge graph", ["MAT:0008 Oxygen", ...types.map((t) => "— " + t + " —")], "Full edges: O relationships registry."));
}
Wf(`${O}/images/applications/0008-Oxygen-O-FIG-012-Applications.svg`,
  cards("O applications by state", [
    ["medical O2", "respiration gas"],
    ["steel/metals", "oxidation processing"],
    ["propulsion", "LOX oxidizer"],
    ["15O PET", "122 s tracer"],
    ["18O climate", "ice-core ratios"],
    ["SOFC/SOEC", "O2− transport"],
  ], "State, not element, applies.", 3));
Wf(`${O}/diagrams/relationships/0008-Oxygen-O-DIAGRAM-009-Evidence-Provenance.svg`,
  flow("O evidence provenance", ["NIST ASD → atomic lines", "NIST + NUBASE → isotopes", "Nature 2023 → 27O/28O", "NOAA/NASA → environment", "DOE/NETL → SOFC/SOEC", "battery lit → O redox"], "2023 overrides NUBASE limits."));
// O graphs: ionization ladder + ROS network + ox-state map + photo-resp cycle
{
  let s = head(560, 300, "O ionization ladder (eV, log)");
  [["I1 13.62", 13.618055], ["I2 35.12", 35.12112], ["I3 54.94", 54.93554], ["I4 77.41", 77.4135]].forEach(([lb, e], k) => {
    const x = 100 + k * 110, Y = 230 - (Math.log10(e) / 2) * 170;
    s += `<rect x="${x}" y="${Y.toFixed(1)}" width="60" height="${(230 - Y).toFixed(1)}" fill="#6cb2ff"/>`;
    s += `<text x="${x + 30}" y="250" ${CSS} font-size="10" fill="#e8edf3" text-anchor="middle">${lb.split(" ")[0]}</text>`;
    s += `<text x="${x + 30}" y="${Y - 6}" ${CSS} font-size="10" fill="#9aa7b8" text-anchor="middle">${e}</text>`;
  });
  Wf(`${O}/graphs/0008-Oxygen-O-GRAPH-002-Ionization-Ladder.svg`, s + cap("NIST ASD; brackets kept in record.", 560, 300));
  csv(`${O}/graphs/data/0008-Oxygen-O-GRAPH-002-Ionization-Ladder.csv`, "level,energy_eV\nI1,13.618055\nI2,35.12112\nI3,54.93554\nI4,77.4135\nI5,113.899\nI6,138.1189\nI7,739.32697\nI8,871.4099138\n");
  Wf(`${O}/graphs/0008-Oxygen-O-GRAPH-008-Reactive-Oxygen-Species-Network.svg`,
    cards("ROS network (roles, not just harm)", [["O2•− radical", "signalling precursor"], ["H2O2", "redox messenger"], ["•OH", "highly reactive"], ["1O2 excited", "non-radical"], ["O3 oxidant", "context decides"]], "SRC-000154. Dose/context rule.", 3));
  csv(`${O}/graphs/data/0008-Oxygen-O-GRAPH-008-Reactive-Oxygen-Species-Network.csv`, "species,radical\nsuperoxide,yes\nH2O2,no\nhydroxyl,yes\nsinglet_O2,no\nozone,no\n");
  Wf(`${O}/graphs/0008-Oxygen-O-GRAPH-009-Oxidation-State-Map.svg`,
    cards("O oxidation states", [["peroxide −1", "O2^2− bond 1"], ["superoxide −1/2", "O2− bond 1.5"], ["oxide −2", "lattice O2−"], ["OF2 O +2", "F wins"], ["O2 0", "elemental ref"]], "Context assigns sign.", 3));
  csv(`${O}/graphs/data/0008-Oxygen-O-GRAPH-009-Oxidation-State-Map.csv`, "species,O_oxidation_state\nperoxide,-1\nsuperoxide,-0.5\noxide,-2\nOF2,+2\nO2,0\n");
  Wf(`${O}/graphs/0008-Oxygen-O-GRAPH-011-Photosynthesis-Respiration-Cycle.svg`,
    flow("O2 ⇄ H2O biological loop", ["PSII: 2H2O → O2 (Mn4CaO5)", "atmosphere/biosphere pool", "respiration: O2 → H2O (Complex IV)"], "Machinery differs both ways."));
  csv(`${O}/graphs/data/0008-Oxygen-O-GRAPH-011-Photosynthesis-Respiration-Cycle.csv`, "step,role\nPSII,O2_evolution\nrespiration,O2_reduction\n");
  console.log("O graphs done");
}

// ================= FLUORINE =================
const Fl = "records/0009-Fluorine-F";
const fYaml = R(`${Fl}/data/structured/0009-Fluorine-F.yaml`);
const fIso = R(`${Fl}/data/isotopes/0009-Fluorine-F-Isotopes.yaml`);
const fRel = R(`${Fl}/relationships/0009-Fluorine-F-Relationships.yaml`);

Wf(`${Fl}/images/scientific/0009-Fluorine-F-FIG-002-Atomic-Identity.svg`,
  cards("Fluorine atomic identity (MAT:0009)", [
    ["F · Z = 9", "1s2 2s2 2p5 · 2P°3/2"],
    ["18.998403163(6)", "monoisotopic weight"],
    ["I1 = 17.42282 eV", "SRC-000157"],
    ["EA = 3.401191 eV", "SRC-000159"],
    ["χ = 3.98 Pauling", "bond polarization"],
    ["one below closed", "2p6 − 1e−"],
  ], "EA ≠ χ.", 3));

Wf(`${Fl}/diagrams/bonding/0009-Fluorine-F-DIAGRAM-001-F2-HF-CF.svg`,
  cards("F bond counterexample (kJ/mol)", [
    ["F–F ≈ 155", "weak reactant bond"],
    ["H–F ≈ 565", "strong product"],
    ["C–F ≈ 485", "strong product"],
    ["reactivity ≠", "reactant strength"],
  ], "Full landscape decides. SRC-000161.", 2));
Wf(`${Fl}/diagrams/bonding/0009-Fluorine-F-DIAGRAM-002-Fluoride-Geometries.svg`,
  cards("Fluoride geometries", [
    ["HF linear", "BF3 trigonal"],
    ["BF4− tetra", "CF4 tetra"],
    ["NF3 pyramid", "OF2 bent"],
    ["SF6 octa", "XeF4 square"],
  ], "Ligand ≠ one geometry.", 2));

Wf(`${Fl}/images/quantum/0009-Fluorine-F-FIG-003-Electron-Probability.svg`,
  cards("F electron structure", [
    ["2p5 open shell", "one hole"],
    ["+ e− → 2p6", "closed anion"],
    ["F− mobile?", "solid-dependent"],
    ["no orbit paths", "probability only"],
  ], "Capture ≠ conduction.", 2));
Wf(`${Fl}/images/quantum/0009-Fluorine-F-FIG-004-Electron-Capture.svg`,
  flow("F + e− → F−", ["F atom 2p5", "electron attachment (EA 3.40 eV)", "F− 2p6 closed shell"], "Anion ≠ mobile carrier."));

{
  const rows = [...fIso.matchAll(/isotope_id: "MAT:0009:ISO:F-(\d+)"\n    mass_number: \d+\n(?:    protons: 9\n    neutrons: (\d+)\n)?/g)].map((m) => [m[1], m[2] || "?"]);
  if (rows.length < 15) throw new Error("F rows " + rows.length);
  const st = { 13: "2021 resonance", 14: "500 ys", 15: "1.1 zs", 16: "21 zs", 17: "64.370 s", 18: "109.732 min PET", 19: "STABLE NMR", 20: "11.0062 s", 21: "4.158 s", 22: "4.23 s", 23: "2.23 s", 24: "384 ms", 25: "80 ms", 26: "8.2 ms", 27: "5.0 ms", 28: "46 zs", 29: "2.5 ms halo?", 30: "2024 resonance", 31: "active drip" };
  Wf(`${Fl}/images/isotope/0009-Fluorine-F-FIG-005-Isotope-Map.svg`,
    cards("F isotopes 13F–31F", rows.map(([a]) => [`${a}F`, st[+a] || "?"]),
      "13F/30F observed beyond mass table.", 4));
  const Wd = 640, H = 560, L = 110, Rm = 40, T = 52;
  const pts = { 14: 500e-24, 15: 1.1e-21, 16: 21e-21, 17: 64.37, 18: 6583.9, 20: 11.0062, 21: 4.158, 22: 4.23, 23: 2.23, 24: 0.384, 25: 0.08, 26: 0.0082, 27: 0.005, 28: 46e-21, 29: 0.0025 };
  const lo = -21, hi = 4;
  const X = (v) => L + ((Math.log10(v) - lo) / (hi - lo)) * (Wd - L - Rm);
  let s = head(Wd, H, "F isotope lifetimes (log s; selection)");
  const order = [[13, "13F 2021"], [14, "14F"], [15, "15F"], [16, "16F"], [17, "17F"], [18, "18F"], [19, "19F STABLE"], [20, "20F"], [21, "21F"], [22, "22F"], [23, "23F"], [24, "24F"], [25, "25F"], [26, "26F"], [27, "27F"], [28, "28F"], [29, "29F"], [30, "30F 2024"], [31, "31F?"]];
  order.forEach(([a, lb], k) => {
    const y = T + 16 + k * 26;
    s += `<text x="${L - 8}" y="${y + 4}" ${CSS} font-size="11" fill="#e8edf3" text-anchor="end">${lb}</text>`;
    s += `<line x1="${L}" y1="${y}" x2="${Wd - Rm}" y2="${y}" stroke="#26313f"/>`;
    if (pts[a]) s += `<circle cx="${X(pts[a]).toFixed(1)}" cy="${y}" r="5" fill="#6cb2ff"/>`;
    else s += `<text x="${L + 4}" y="${y - 5}" ${CSS} font-size="10" fill="#e0a100">RESONANCE / ACTIVE</text>`;
  });
  s += cap("NUBASE2020 + 2021/2024 overrides. 31F active research.", Wd, H);
  Wf(`${Fl}/graphs/0009-Fluorine-F-GRAPH-001-Isotope-Lifetime-Map.svg`, s);
  csv(`${Fl}/graphs/data/0009-Fluorine-F-GRAPH-001-Isotope-Lifetime-Map.csv`, "isotope,half_life_s,note\n13F,,OBSERVED-2021\n14F,5.0e-22,\n15F,1.1e-21,\n16F,2.1e-20,\n17F,64.37,\n18F,6583.9,\n19F,,STABLE\n20F,11.0062,\n21F,4.158,\n22F,4.23,\n23F,2.23,\n24F,0.384,\n25F,0.08,\n26F,0.0082,\n27F,0.005,\n28F,4.6e-20,\n29F,0.0025,\n30F,,OBSERVED-2024\n31F,,ACTIVE\n");
}

Wf(`${Fl}/images/spectral/0009-Fluorine-F-FIG-006-Atomic-Spectrum.svg`,
  cards("F I / F II lines (nm)", [
    ["95.1870 F I", "2P°→2P persistent"],
    ["95.8525 F I", "companion line"],
    ["60.5669 F II", "ion persistent"],
    ["60.6804 F II", "ion persistent"],
  ], "SRC-000179. Not F2/NMR.", 2));
Wf(`${Fl}/images/spectral/0009-Fluorine-F-FIG-007-Molecular-NMR-Spectrum.svg`,
  cards("Molecular + NMR layer", [
    ["F2 vib 916.93", "cm−1 ωe"],
    ["HF 4138.32", "cm−1 stretch"],
    ["19F I=1/2", "100% NMR"],
    ["ν = γB/2π", "field explicit"],
  ], "NO UNIVERSAL F FREQUENCY.", 2));

Wf(`${Fl}/images/properties/0009-Fluorine-F-FIG-008-Physical-State.svg`,
  cards("F2 phases", [
    ["Tm 53.48 K", "solid forms"],
    ["Tb 85.04 K", "normal boiling"],
    ["pale yellow", "gas appearance"],
    ["cold ≠ inert", "still reactive"],
  ], "SRC-000161.", 2));
Wf(`${Fl}/diagrams/fields/0009-Fluorine-F-DIAGRAM-003-Fluoride-Ion-Conduction.svg`,
  flow("F− hopping transport", ["F− at site", "vacancy/interstitial path", "adjacent site", "conductivity = f(defects,T)"], "Carrier, not free ion."));
Wf(`${Fl}/diagrams/fields/0009-Fluorine-F-DIAGRAM-004-Fluoride-Battery.svg`,
  flow("Fluoride shuttle (research)", ["fluorination at electrode", "F− through electrolyte", "defluorination return", "reversibility = material"], "Stability ⇄ reversibility trade."));
Wf(`${Fl}/diagrams/fields/0009-Fluorine-F-DIAGRAM-005-Magnetic-NMR-State.svg`,
  cards("F magnetism", [
    ["F atom", "open-shell para"],
    ["F2 singlet", "diamagnetic"],
    ["19F NMR", "I=1/2, 100%"],
    ["solids vary", "state-dependent"],
  ], "Assembly changes response.", 2));
Wf(`${Fl}/images/properties/0009-Fluorine-F-FIG-009-Thermal-and-Molten-Salt.svg`,
  cards("Thermal + salt states", [
    ["F2 Tm/Tb", "53.48 / 85.04 K"],
    ["LiF/BeF2 melt", "coordinated network"],
    ["FLiBe polymeric", "BeF4/Be2F7 units"],
    ["T/P required", "always"],
  ], "Salt ≠ elemental phases.", 2));
Wf(`${Fl}/images/properties/0009-Fluorine-F-FIG-010-PTFE-Structure.svg`,
  cards("PTFE chain", [
    ["[−CF2−CF2−]n", "repeat unit"],
    ["Tm ≈ 327 °C", "processing hard"],
    ["low friction", "surface effect"],
    ["Plunkett 1938", "accidental + seen"],
  ], "Polymer, not element.", 2));
Wf(`${Fl}/images/properties/0009-Fluorine-F-FIG-011-BeF2-FLiBe-Network.svg`,
  cards("BeF2 / FLiBe network", [
    ["BeF4 tetrahedra", "corner-sharing"],
    ["Be2F7/Be3F10", "polymeric units"],
    ["SiO2 analogy", "topology only"],
    ["2LiF-BeF2 ref", "composition-gated"],
  ], "SRC-000171/176/177.", 2));
Wf(`${Fl}/images/properties/0009-Fluorine-F-FIG-012-Compatibility-State-Map.svg`,
  cards("Compatibility axes", [
    ["form · T · t", "state variables"],
    ["H2O content", "HF risk lever"],
    ["passivation?", "surface decides"],
    ["strength ≠", "compatibility"],
  ], "System property.", 2));
Wf(`${Fl}/diagrams/processes/0009-Fluorine-F-DIAGRAM-006-Transformation-Network.svg`,
  flow("F transformation network", ["F− electrolysis → F2", "Li/Be/B/C/N/O/Si → fluorides", "polymers ← C–F growth", "plasma → radicals/ions", "18F → 18O PET decay (nuclear)"], "Chemical vs nuclear apart."));
{
  const types = [...new Set([...fRel.matchAll(/type: "([A-Z0-9-]+)"/g)].map((m) => m[1]))];
  Wf(`${Fl}/diagrams/relationships/0009-Fluorine-F-DIAGRAM-007-Knowledge-Graph.svg`,
    flow("MAT:0009 knowledge graph", ["MAT:0009 Fluorine", ...types.map((t) => "— " + t + " —")], "Full edges: F relationships registry."));
}
Wf(`${Fl}/images/applications/0009-Fluorine-F-FIG-013-Applications.svg`,
  cards("F applications by state", [
    ["19F NMR", "spectroscopy"],
    ["18F PET", "110 min tracer"],
    ["etching", "plasma radicals"],
    ["FLiBe salts", "heat/blanket R&D"],
    ["batteries", "F− shuttles"],
    ["minerals", "fluorite ore"],
  ], "State-gated uses.", 3));
Wf(`${Fl}/diagrams/relationships/0009-Fluorine-F-DIAGRAM-008-Evidence-Provenance.svg`,
  flow("F evidence provenance", ["NIST ASD → atomic ladder", "NIST + NUBASE → isotopes", "2021/2024 → 13F/30F new", "WebBook → molecules", "USGS/ORNL → salts/minerals", "OECD/EPA → PFAS terms"], "Terms need jurisdiction."));
// F graphs: ionization ladder, F2/HF compare, bond refs, ox-state, classification, F18 decay, knowledge graph
{
  let s = head(640, 300, "F ionization ladder (eV, log)");
  [["I1 17.42", 17.42282], ["I2 34.97", 34.97081], ["I3 62.71", 62.70798], ["I6 157.16", 157.16311], ["I9 1103.1", 1103.1175302]].forEach(([lb, e], k) => {
    const x = 80 + k * 110, Y = 230 - (Math.log10(e) / 3.2) * 175;
    s += `<rect x="${x}" y="${Y.toFixed(1)}" width="60" height="${(230 - Y).toFixed(1)}" fill="#6cb2ff"/>`;
    s += `<text x="${x + 30}" y="250" ${CSS} font-size="10" fill="#e8edf3" text-anchor="middle">${lb.split(" ")[0]}</text>`;
    s += `<text x="${x + 30}" y="${Y - 6}" ${CSS} font-size="10" fill="#9aa7b8" text-anchor="middle">${e}</text>`;
  });
  Wf(`${Fl}/graphs/0009-Fluorine-F-GRAPH-002-Ionization-Ladder.svg`, s + cap("Brackets kept in record. NIST ASD.", 640, 300));
  csv(`${Fl}/graphs/data/0009-Fluorine-F-GRAPH-002-Ionization-Ladder.csv`, "level,energy_eV\nI1,17.42282\nI2,34.97081\nI3,62.70798\nI4,87.175\nI5,114.249\nI6,157.16311\nI7,185.1868\nI8,953.8983\nI9,1103.1175302\n");
  Wf(`${Fl}/graphs/0009-Fluorine-F-GRAPH-004-F2-HF-Molecular-Comparison.svg`,
    cards("F2 vs HF molecules", [["F2 re 1.412 Å", "ωe 916.93"], ["HF re 0.9168 Å", "ωe 4138.32"], ["F2 D0 154.9", "kJ/mol weak"], ["HF ΔHf −273.3", "kJ/mol deep well"]], "Different molecules.", 2));
  csv(`${Fl}/graphs/data/0009-Fluorine-F-GRAPH-004-F2-HF-Molecular-Comparison.csv`, "molecule,re_A,omega_cm1\nF2,1.412,916.93\nHF,0.916808,4138.32\n");
  Wf(`${Fl}/graphs/0009-Fluorine-F-GRAPH-005-Bond-Reference-Bars.svg`,
    cards("Bond enthalpies (kJ/mol)", [["F–F ≈ 155", "reactant weak"], ["C–F ≈ 485", "product deep"], ["H–F ≈ 565", "product deepest"]], "Landscape, not one bond.", 3));
  csv(`${Fl}/graphs/data/0009-Fluorine-F-GRAPH-005-Bond-Reference-Bars.csv`, "bond,kJ_mol\nF-F,155\nC-F,485\nH-F,565\n");
  Wf(`${Fl}/graphs/0009-Fluorine-F-GRAPH-007-Partner-Oxidation-States.svg`,
    cards("F stabilizes high states", [["SF6 S +6", "octahedral"], ["UF6 U +6", "volatile process"], ["PtF6 Pt +6", "Bartlett route"], ["XeF4 Xe +4", "inertness broken"]], "Ligand enables state.", 2));
  csv(`${Fl}/graphs/data/0009-Fluorine-F-GRAPH-007-Partner-Oxidation-States.csv`, "compound,partner_ox\nSF6,6\nUF6,6\nPtF6,6\nXeF4,4\nOF2_O,2\n");
  Wf(`${Fl}/graphs/0009-Fluorine-F-GRAPH-010-Compound-Classification-Tree.svg`,
    flow("Fluorinated ≠ PFAS (decision aid)", ["fluorinated compound?", "inorganic/simple? → NOT PFAS", "polymer? → definition-dependent", "CF3/CF2 saturated? → OECD screen", "program rules? → EPA CCL5/TSCA"], "Jurisdiction + program decide."));
  csv(`${Fl}/graphs/data/0009-Fluorine-F-GRAPH-010-Compound-Classification-Tree.csv`, "class,PFAS\ninorganic_fluoride,no\nsimple_molecular,no\nOECD_screen,structural\nEPA_program,program_specific\n");
  let d = head(560, 300, "18F decay (minutes)");
  let pts = [];
  for (let m = 0; m <= 600; m += 10) pts.push([m, Math.exp(-Math.LN2 * m / 109.732)]);
  const X = (x) => 56 + (x / 600) * (560 - 56 - 16), Y = (v) => 300 - 52 - v * (300 - 48 - 52);
  d += `<polyline fill="none" stroke="#6cb2ff" stroke-width="2" points="${pts.map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ")}"/>`;
  d += `<text x="308" y="292" ${CSS} font-size="12" fill="#9aa7b8" text-anchor="middle">minutes (t½ = 109.732)</text>`;
  Wf(`${Fl}/graphs/0009-Fluorine-F-GRAPH-011-F18-Decay.svg`, d + cap("β+ 96.86% → annihilation photons.", 560, 300));
  csv(`${Fl}/graphs/data/0009-Fluorine-F-GRAPH-011-F18-Decay.csv`, "minutes,fraction\n0,1.0\n109.732,0.5\n219.464,0.25\n");
  console.log("F graphs done");
}
console.log("ALL PASS-7 DONE");
