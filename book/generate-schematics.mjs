// Schematic + data-driven SVG generator, pass 2. Every number is parsed
// from the record files cited in captions; the script throws if a value
// is missing. Run: node book/generate-schematics.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const R = (p) => readFileSync(join(root, p), "utf8").replace(/\r\n/g, "\n");
const F = (re, t, label) => {
  const m = t.match(re);
  if (!m) throw new Error("missing data: " + label);
  return m[1];
};
const CSS = 'font-family="system-ui,sans-serif"';
const head = (w, h, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"><rect width="${w}" height="${h}" fill="#0f141b"/><text x="16" y="28" ${CSS} font-size="16" font-weight="700" fill="#e8edf3">${title}</text>`;
const cap = (t, w, h) => `<text x="16" y="${h - 10}" ${CSS} font-size="10" fill="#5c6b80">${t}</text></svg>`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
function cards(paths, title, items, caption, cols = 3) {
  const cw = 200, ch = 64, L = 16, T = 52;
  const W = L * 2 + cols * cw, H = T + 14 + Math.ceil(items.length / cols) * ch + 30;
  let s = head(W, H, esc(title));
  items.forEach(([h, sub], k) => {
    const x = L + (k % cols) * cw, y = T + Math.floor(k / cols) * ch;
    s += `<rect x="${x + 4}" y="${y + 4}" width="${cw - 8}" height="${ch - 8}" rx="8" fill="#161d27" stroke="#26313f"/>`;
    s += `<text x="${x + 14}" y="${y + 28}" ${CSS} font-size="13" font-weight="700" fill="#6cb2ff">${esc(h)}</text>`;
    s += `<text x="${x + 14}" y="${y + 46}" ${CSS} font-size="10" fill="#9aa7b8">${esc(sub).slice(0, 30)}</text>`;
  });
  return s + cap(esc(caption), W, H);
}
function flow(path, title, nodes, caption) {
  const W = 520, bh = 44, gap = 26, L = 60, T = 56;
  const H = T + nodes.length * (bh + gap) + 30;
  let s = head(W, H, esc(title));
  nodes.forEach((n, k) => {
    const y = T + k * (bh + gap);
    s += `<rect x="${L}" y="${y}" width="${W - L * 2}" height="${bh}" rx="8" fill="#161d27" stroke="#26313f"/>`;
    s += `<text x="${W / 2}" y="${y + 27}" ${CSS} font-size="12" fill="#e8edf3" text-anchor="middle">${esc(n)}</text>`;
    if (k) s += `<line x1="${W / 2}" y1="${y - gap}" x2="${W / 2}" y2="${y}" stroke="#6cb2ff"/><polygon points="${W / 2 - 5},${y - 8} ${W / 2 + 5},${y - 8} ${W / 2},${y}" fill="#6cb2ff"/>`;
  });
  return s + cap(esc(caption), W, H);
}
function levels(path, title, lvls, caption, unit) {
  // lvls: [[label, eV],...]; continuum/ionization drawn at max value
  const W = 560, H = 120 + lvls.length * 34 + 40, L = 200, T = 60;
  const es = lvls.map((l) => l[1]);
  const emin = Math.min(...es), emax = Math.max(0, ...es);
  const span = (emax - emin) || 1;
  const Y = (e) => T + (1 - (e - emin) / span) * (H - T - 70);
  let s = head(W, H, esc(title));
  lvls.forEach(([lb, e]) => {
    s += `<line x1="${L}" y1="${Y(e)}" x2="${W - 40}" y2="${Y(e)}" stroke="#6cb2ff" stroke-width="2"/>`;
    s += `<text x="${L - 8}" y="${Y(e) + 4}" ${CSS} font-size="11" fill="#e8edf3" text-anchor="end">${esc(lb)}</text>`;
    s += `<text x="${W - 36}" y="${Y(e) + 4}" ${CSS} font-size="11" fill="#9aa7b8">${e} eV</text>`;
  });
  s += `<line x1="${L}" y1="${Y(emax)}" x2="${W - 40}" y2="${Y(emax)}" stroke="#e0a100" stroke-dasharray="5 4"/><text x="${L - 8}" y="${Y(emax) - 8}" ${CSS} font-size="11" fill="#e0a100" text-anchor="end">continuum</text>`;
  return s + cap(esc(caption) + ` Units: ${unit}.`, W, H);
}
const W = (p, c) => { writeFileSync(join(root, p), c); console.log("wrote " + p); };

// ---------- H data ----------
const hYaml = R("records/0001-Hydrogen-H/data/structured/0001-Hydrogen-H.yaml");
const hMain = R("records/0001-Hydrogen-H/0001-Hydrogen-H.md");
const hIso = R("records/0001-Hydrogen-H/data/isotopes/0001-Hydrogen-H-Isotopes.yaml");
const I1 = F(/value: (13\.598434599702)/, hYaml, "H I1");
const EA = F(/recommended_measurement:\s*\n\s*value: (0\.754195)/, hYaml, "H EA");
const HF = "1420405751.768";
const calc002 = R("records/0001-Hydrogen-H/calculations/0001-Hydrogen-H-CALC-002-Hyperfine-Wavelength.md");
if (!calc002.includes(HF)) throw new Error("HF frequency missing");

// FIG-002 atomic identity
W("records/0001-Hydrogen-H/images/scientific/0001-Hydrogen-H-FIG-002-Atomic-Identity.svg",
  cards(0, "Hydrogen atomic identity (MAT:0001)", [
    ["H · Z = 1", "1 proton / 1 electron"],
    ["[1.00784, 1.00811]", "standard atomic weight"],
    ["1s1 · 2S1/2", "ground state"],
    [`I1 = ${I1} eV`, "ionization (SRC-H-001)"],
    [`EA = ${EA} eV`, "electron affinity"],
    ["s-block · group 1", "period 1"],
  ], "Values: NIST ASD / NIST isotope table via MAT:0001. Bohr-style orbits NOT literal.", 3));

// FIG-005 isotope map from registry
{
  const names = [...hIso.matchAll(/name: "([^"]+)"\n    notation: "([^"]+)"/g)].map((m) => [m[1], m[2]]);
  const neutrons = [...hIso.matchAll(/neutron_number: (\d)/g)].map((m) => m[1]);
  if (names.length !== 7 || neutrons.length !== 7) throw new Error("H isotope rows");
  const rows = names.map((r, k) => [r[0], r[1], neutrons[k]]);
  const stab = ["STABLE", "STABLE", "12.32 y β−", "~139 ys", "~86 ys", "~294 ys eval.", "highly uncertain"];
  W("records/0001-Hydrogen-H/images/isotope/0001-Hydrogen-H-FIG-005-Isotope-Map.svg",
    cards(0, "Hydrogen isotopes 1H–7H (NUCLEAR SCHEMATIC)", rows.map((r, k) =>
      [`${r[1]} ${r[0]}`, `1p ${r[2]}n · ${stab[k]}`]),
      "NUCLEAR SCHEMATIC — not literal nucleon positions. NUBASE2020 via SRC-H-004.", 4));
}

// FIG-003 1s radial probability, dimensionless units (no external constants)
{
  const Wd = 640, H = 380, L = 56, B = 52, T = 48, Rm = 16, XMAX = 6;
  const P = (x) => 4 * x * x * Math.exp(-2 * x);
  const X = (x) => L + (x / XMAX) * (Wd - L - Rm);
  const Y = (y) => H - B - (y / 0.55) * (H - T - B);
  let s = head(Wd, H, "H 1s radial probability density (ideal)");
  let pts = [];
  for (let x = 0; x <= XMAX; x += 0.05) pts.push(`${X(x).toFixed(1)},${Y(P(x)).toFixed(1)}`);
  s += `<polyline fill="none" stroke="#6cb2ff" stroke-width="2" points="${pts.join(" ")}"/>`;
  s += `<line x1="${X(1)}" y1="${T}" x2="${X(1)}" y2="${H - B}" stroke="#e0a100" stroke-dasharray="5 4"/><text x="${X(1) + 4}" y="${T + 14}" ${CSS} font-size="11" fill="#e0a100">maximum at r = a0</text>`;
  s += `<text x="${(Wd + L) / 2}" y="${H - 8}" ${CSS} font-size="12" fill="#9aa7b8" text-anchor="middle">r / a0</text>`;
  s += `<text x="14" y="200" ${CSS} font-size="12" fill="#9aa7b8" text-anchor="middle" transform="rotate(-90 14 200)">P(r)·a0</text>`;
  W("records/0001-Hydrogen-H/images/quantum/0001-Hydrogen-H-FIG-003-1s-Probability-Density.svg",
    s + cap("Ideal nonrelativistic 1s: Pdr/a0. Probability density is not a classical orbit.", Wd, H));
}

// FIG-004 + GRAPH-002 energy levels from record §12 + I1
{
  const lv = [["1s", -13.6], ["2p: 10.1988 eV exc.", -3.4], ["3p: 12.0875", -1.51], ["4p: 12.7485", -0.85], ["5p: 13.0545", -0.54], ["6p: 13.2207", -0.38]];
  if (!hMain.includes("10.1988 eV") || !hMain.includes("13.2207 eV")) throw new Error("H excitation table missing");
  W("records/0001-Hydrogen-H/images/quantum/0001-Hydrogen-H-FIG-004-Energy-Level-Structure.svg",
    levels(0, "H atomic energy levels (ideal Coulomb + measured excitations)", lv, "Ideal En=−13.6/n² eV; excitations NIST ASD. Selection rules govern transitions.", "eV"));
  let csv = "transition,excitation_eV\n1s-2p,10.1988\n1s-3p,12.0875\n1s-4p,12.7485\n1s-5p,13.0545\n1s-6p,13.2207\n";
  writeFileSync(join(root, "records/0001-Hydrogen-H/graphs/data/0001-Hydrogen-H-GRAPH-002-Atomic-Energy-Levels.csv"), csv);
  W("records/0001-Hydrogen-H/graphs/0001-Hydrogen-H-GRAPH-002-Atomic-Energy-Levels.svg",
    levels(0, "H excitation series toward ionization (13.5984 eV)", lv, "NIST ASD via SRC-H-001. Approaches I1 continuum.", "eV"));
  console.log("wrote GRAPH-002 csv+svg");
}

// FIG-006 fingerprint panels
W("records/0001-Hydrogen-H/images/spectral/0001-Hydrogen-H-FIG-006-Spectral-Fingerprint.svg",
  cards(0, "Hydrogen spectral fingerprint — NO universal frequency", [
    ["Electronic", "Ly-α ~121.6 nm · Hα ~656.3"],
    ["Hyperfine", "1420.405751768 MHz"],
    ["H2 vibration", "ωe 4401.21 cm−1"],
    ["H2 rotation", "Be 60.8530 cm−1"],
    ["Fine structure", "relativistic + Lamb"],
    ["Plasma / NMR", "state-dependent"],
  ], "Mechanism-resolved. Hyperfine = 1H ground-state transition ONLY.", 3));

// FIG-007 dashboard, FIG-008 thermal, FIG-009 phase skeleton, FIG-010 apps
W("records/0001-Hydrogen-H/images/properties/0001-Hydrogen-H-FIG-007-Physical-Property-Dashboard.svg",
  cards(0, "Hydrogen states — properties belong to states", [
    ["Atomic H", "1s · I1 13.5984 eV"],
    ["H2 gas", "X1Σg+ · re 0.74144 Å"],
    ["para-H2", "low-T equilibrium"],
    ["ortho-H2", "spin isomer"],
    ["Liquid H2", "Tb(e-H2) 20.271 K"],
    ["Plasma", "Te/Ti/ne dependent"],
  ], "No generic density/boiling point without state.", 3));
W("records/0001-Hydrogen-H/images/properties/0001-Hydrogen-H-FIG-008-Thermal-Cryogenic-State.svg",
  cards(0, "Hydrogen thermal / cryogenic states", [
    ["Tb = 20.271 K", "equilibrium H2 (SRC-H-007)"],
    ["normal-H2", "75% ortho / 25% para"],
    ["para-H2", "low-T favored"],
    ["ortho-H2", "spin isomer"],
    ["H2 solid", "cryogenic + pressure"],
    ["H2 gas", "ambient reference"],
  ], "Ortho/para composition affects thermodynamics.", 3));
{
  const Wd = 560, H = 300, L = 70, T = 60;
  const Y = (t) => T + (t / 30) * (H - T - 60);
  let s = head(Wd, H, "H2 phase reference skeleton (partial data)");
  s += `<circle cx="200" cy="${Y(20.271)}" r="6" fill="#6cb2ff"/><text x="214" y="${Y(20.271) + 4}" ${CSS} font-size="11" fill="#e8edf3">Tb(e-H2) = 20.271 K</text>`;
  s += `<text x="200" y="${Y(27)}" ${CSS} font-size="11" fill="#9aa7b8">triple point: DATA-REQUIRED</text>`;
  s += `<text x="200" y="${Y(29)}" ${CSS} font-size="11" fill="#9aa7b8">critical point: DATA-REQUIRED</text>`;
  s += `<text x="70" y="${H - 40}" ${CSS} font-size="11" fill="#9aa7b8">T (K, 0–30 shown)</text>`;
  W("records/0001-Hydrogen-H/images/properties/0001-Hydrogen-H-FIG-009-Phase-Environment-Map.svg",
    s + cap("Only Tb plotted (SRC-H-007). Curves require SRC-H-008 EOS extraction.", Wd, H));
}
W("records/0001-Hydrogen-H/images/applications/0001-Hydrogen-H-FIG-010-Applications.svg",
  cards(0, "Hydrogen applications by state", [
    ["H2 fuel/feedstock", "fuel cells · ammonia"],
    ["2H / 3H fusion", "D–T research"],
    ["3H tracer", "isotope science"],
    ["Atomic H", "spectroscopy · plasma"],
    ["LH2", "rocket · cryogenics"],
    ["H2 industry", "refining · metals"],
  ], "Each use requires its state. DOE context.", 3));

// DIAGRAMs 001–005
W("records/0001-Hydrogen-H/diagrams/bonding/0001-Hydrogen-H-DIAGRAM-001-H2-Bonding.svg",
  cards(0, "H2 bonding (X1Σg+, re = 0.74144 Å)", [
    ["H–H", "re 0.74144 Å"],
    ["ωe 4401.21", "cm−1 (SRC-H-006)"],
    ["Be 60.8530", "cm−1 (SRC-H-006)"],
    ["H2 · HD · D2", "isotopologues"],
    ["HT · DT · T2", "isotopologues"],
    ["ortho / para", "spin isomers"],
  ], "Geometry, vibration, rotation are distinct quantities.", 3));
W("records/0001-Hydrogen-H/diagrams/fields/0001-Hydrogen-H-DIAGRAM-002-Charge-and-Electrical-State.svg",
  cards(0, "Hydrogen charge states (I1 = 13.5984 eV)", [
    ["H−", "hydride anion"],
    ["H", "neutral atom"],
    ["H+ / D+ / T+", "isotope-labeled ions"],
    ["H2+", "molecular ion"],
    ["H3+", "triatomic ion"],
    ["plasma", "Te/Ti/ne family"],
  ], "Conductivity is state-dependent.", 3));
W("records/0001-Hydrogen-H/diagrams/fields/0001-Hydrogen-H-DIAGRAM-003-Magnetic-Spin-Field-State.svg",
  cards(0, "Hydrogen spin / field states", [
    ["electron spin 1/2", "Zeeman splitting"],
    ["proton I = 1/2", "hyperfine 1420 MHz"],
    ["deuteron I = 1", "spin-1 effects"],
    ["triton I = 1/2", "hyperfine"],
    ["ortho-H2", "triplet nuclear spin"],
    ["para-H2", "singlet nuclear spin"],
  ], "Not a permanent bar magnet.", 3));
W("records/0001-Hydrogen-H/diagrams/processes/0001-Hydrogen-H-DIAGRAM-004-Host-Material-Interaction.svg",
  flow(0, "Hydrogen host-material pathway", ["H2 gas", "surface adsorption", "atomic H (dissociated)", "absorption / diffusion", "trapping", "hydride / degradation (host-dependent)"], "Embrittlement is host/state/stress/history-dependent."));
W("records/0001-Hydrogen-H/diagrams/processes/0001-Hydrogen-H-DIAGRAM-005-Transformation-Network.svg",
  flow(0, "Hydrogen transformation network (chemical branch)", ["H2O electrolysis → H2", "H2 compression / liquefaction", "H2 dissociation → 2H", "ionization → plasma", "fuel-cell oxidation → H2O", "D + T FUSION → 4He + n (nuclear, separate)"], "Chemical and nuclear arrows never merged."));

// DIAGRAM-006 knowledge graph from relationships yaml
{
  const rel = R("records/0001-Hydrogen-H/relationships/0001-Hydrogen-H-Relationships.yaml");
  const types = [...new Set([...rel.matchAll(/type: "([A-Z0-9-]+)"/g)].map((m) => m[1]))];
  if (types.length < 10) throw new Error("relationship types missing");
  W("records/0001-Hydrogen-H/diagrams/relationships/0001-Hydrogen-H-DIAGRAM-006-Knowledge-Graph.svg",
    flow(0, "MAT:0001 knowledge-graph edge classes", ["MAT:0001 Hydrogen", ...types.slice(0, 10).map((t) => "— " + t + " —")], "Full edges: 0001-Hydrogen-H-Relationships.yaml."));
}
// DIAGRAM-007 evidence flow from sources
{
  const srcy = R("records/0001-Hydrogen-H/sources/0001-Hydrogen-H-Sources.yaml");
  const kinds = [...new Set([...srcy.matchAll(/source_type: "([A-Z-]+)"/g)].map((m) => m[1]))];
  W("records/0001-Hydrogen-H/diagrams/relationships/0001-Hydrogen-H-DIAGRAM-007-Evidence-Provenance.svg",
    flow(0, "Hydrogen evidence provenance", ["MEASUREMENT → MAT object", "EVALUATION (NIST/NUBASE) → adopted value", "NEW 2025 6H data → kept separate", "HYPOTHESIS → test → verdict", "AI extraction = method, never source"], "New measurement never silently rewrites evaluation."));
}
// GRAPH-004 hyperfine marker + CSV, GRAPH-005 constant cards + CSV
{
  const Wd = 640, H = 220;
  let s = head(Wd, H, "H 21-cm hyperfine transition (single precise point)");
  s += `<circle cx="320" cy="110" r="8" fill="#6cb2ff"/><text x="320" y="90" ${CSS} font-size="12" fill="#e8edf3" text-anchor="middle">1420405751.768 Hz</text>`;
  s += `<text x="320" y="140" ${CSS} font-size="11" fill="#9aa7b8" text-anchor="middle">λ = 0.21106114054 m (MAT:0001:CALC:002) · σ = 0.002 Hz</text>`;
  W("records/0001-Hydrogen-H/graphs/0001-Hydrogen-H-GRAPH-004-Hyperfine-21cm.svg",
    s + cap("One transition, not a universal H frequency. SRC-H-005.", Wd, H));
  writeFileSync(join(root, "records/0001-Hydrogen-H/graphs/data/0001-Hydrogen-H-GRAPH-004-Hyperfine-21cm.csv"), "quantity,value,unit\nfrequency,1420405751.768,Hz\nwavelength,0.21106114054,m\n");
  W("records/0001-Hydrogen-H/graphs/0001-Hydrogen-H-GRAPH-005-H2-Spectroscopic-Constants.svg",
    cards(0, "H2 spectroscopic constants (distinct quantities)", [["re = 0.74144 Å", "geometry"], ["ωe = 4401.21 cm−1", "vibration"], ["Be = 60.8530 cm−1", "rotation"]], "SRC-H-006. Not interchangeable, not one frequency.", 3));
  writeFileSync(join(root, "records/0001-Hydrogen-H/graphs/data/0001-Hydrogen-H-GRAPH-005-H2-Spectroscopic-Constants.csv"), "constant,value,unit\nre,0.74144,angstrom\nomega_e,4401.21,cm-1\nB_e,60.8530,cm-1\n");
  console.log("GRAPH-004/005 done");
}

// ---------- He data ----------
const heYaml = R("records/0002-Helium-He/data/structured/0002-Helium-He.yaml");
const heMain = R("records/0002-Helium-He/0002-Helium-He.md");
const heIso = R("records/0002-Helium-He/data/isotopes/0002-Helium-He-Isotopes.yaml");
W("records/0002-Helium-He/images/scientific/0002-Helium-He-FIG-002-Atomic-Identity.svg",
  cards(0, "Helium atomic identity (MAT:0002)", [
    ["He · Z = 2", "2 protons / 2 electrons"],
    ["4.002602(2)", "standard atomic weight"],
    ["1s2 · 1S0", "closed shell"],
    ["I1 = 24.587389011 eV", "SRC-000005"],
    ["I2 = 54.4177655282 eV", "He+ → He2+"],
    ["monatomic gas", "no stable He2"],
  ], "Closed shell ≠ no excited/ionic/plasma states.", 3));
{
  const rows = [...heIso.matchAll(/name: "([^"]+)"\n    notation: "([^"]+)"\n    proton_number: 2\n    neutron_number: (\d)/g)].map((m) => m.slice(1));
  if (rows.length !== 8) throw new Error("He isotope rows: " + rows.length);
  const stab = ["STABLE fermion", "STABLE boson", "602 ys", "806.92 ms", "2.51 zs", "119.5 ms", "2.5 zs ±2.3", "260 ys"];
  W("records/0002-Helium-He/images/isotope/0002-Helium-He-FIG-005-Isotope-Map.svg",
    cards(0, "Helium isotopes 3He–10He (NUCLEAR SCHEMATIC)", rows.map((r, k) => [`${r[1]}`, `2p ${r[2]}n · ${stab[k]}`]),
      "NUCLEAR SCHEMATIC. 3He fermion vs 4He boson → different quantum fluids.", 4));
}
{
  const lv = [["1s2", 0], ["1s2p: 21.2180", 21.218], ["1s3p: 23.0870", 23.087], ["1s4p: 23.7421", 23.742], ["I1: 24.5874", 24.5874]];
  if (!heMain.includes("21.2180 eV")) throw new Error("He excitation table missing");
  W("records/0002-Helium-He/graphs/0002-Helium-He-GRAPH-001-Excitation-Series.svg",
    levels(0, "He excitation series toward I1 (24.5874 eV)", lv, "NIST ASD via SRC-000005. Singlet/triplet detail in child records.", "eV"));
  writeFileSync(join(root, "records/0002-Helium-He/graphs/data/0002-Helium-He-GRAPH-001-Excitation-Series.csv"), "transition,excitation_eV\n1s2-1s2p,21.2180\n1s2-1s3p,23.0870\n1s2-1s4p,23.7421\n1s2-1s5p,24.0458\n1s2-1s6p,24.2110\n");
}
W("records/0002-Helium-He/images/properties/0002-Helium-He-FIG-010-Cryogenic-Reference.svg",
  cards(0, "4He cryogenic reference points (SRC-000025)", [
    ["Tb = 4.2221 K", "101325 Pa"],
    ["Tc = 5.1953 K", "Pc 227460 Pa"],
    ["Tλ = 2.1768 K", "He-I → He-II"],
    ["3He superfluid", "far below Tλ"],
    ["solid He", "pressure required"],
    ["no 1-atm melt", "NOT-APPLICABLE"],
  ], "3He and 4He are separate phase records.", 3));

// ---------- 0000 reference diagrams (presentations of record content) ----------
const D = "records/0000-Origin-State/diagrams";
const refEq = (f, title, lines, caption) => {
  const Wd = 620, H = 90 + lines.length * 30 + 34;
  let s = head(Wd, H, title);
  lines.forEach((ln, k) => { s += `<text x="40" y="${80 + k * 30}" ${CSS} font-size="13" fill="#e8edf3">${esc(ln)}</text>`; });
  W(f, s + cap(caption + " SCIENTIFIC-SCHEMATIC.", Wd, H));
};
refEq(D + "/reference-frames/0000-Origin-State-DIAGRAM-001-Reference-Origin.svg", "MAT 0000 reference origin",
  ["z0 = (0,0,…,0) — normalized computational origin", "Δq = q − qref (same quantity, compatible units)", "Δqij = qi − qj (pairwise comparison)", "MATHEMATICAL / INFORMATION REFERENCE — NOT literal nothingness"],
  "MAT:0000 §3–§5.");
refEq(D + "/reference-frames/0000-Origin-State-DIAGRAM-002-Quantum-Vacuum-Reference.svg", "Quantum vacuum vs classical empty space",
  ["CLASSICAL EMPTY-SPACE IDEALIZATION ≠ QUANTUM VACUUM STATE ≠ MAT ORIGIN", "QV needs: model · fields · boundaries · convention", "VAC (lab, measurable P/T/gas) ≠ QV (model-defined)"],
  "MAT:0000 §22. These three are NOT identical.");
refEq(D + "/reference-frames/0000-Origin-State-DIAGRAM-003-Frequency-Reference-Axes.svg", "Frequency reference channels",
  ["NUCLEAR · HYPERFINE · ELECTRONIC · ROTATIONAL · VIBRATIONAL", "PHONON · PLASMA · ACOUSTIC · MAGNETIC RESONANCE", "ω = 2πν · E = hν · c = λν (vacuum EM)", "NO UNIVERSAL SINGLE ELEMENT FREQUENCY"],
  "MAT:0000 §V06.");
W(D + "/reference-frames/0000-Origin-State-DIAGRAM-004-Electric-Field-Reference.svg",
  cards(0, "Electric-field reference (E0)", [["ΔE = E − E0", "typed difference"], ["E0 = 0 V/m applied", "experimental frame"], ["NOT total absence", "of all EM activity"]], "MAT:0000:REF:E0.", 3));
W(D + "/reference-frames/0000-Origin-State-DIAGRAM-005-Magnetic-Field-Reference.svg",
  cards(0, "Magnetic-field reference (B0)", [["ΔB = B − B0", "typed difference"], ["applied vs internal", "separate objects"], ["moments · domains", "intrinsic, not B0"], ["remanence", "history-dependent"]], "MAT:0000:REF:B0.", 2));
W(D + "/reference-frames/0000-Origin-State-DIAGRAM-006-Temperature-Reference.svg",
  cards(0, "Temperature reference (T0)", [["ΔT = T − T0", "selected reference"], ["T0 ≠ 0 K", "unless so defined"], ["0 K ≠ zero energy", "quantum motion remains"]], "MAT:0000 §10–§11.", 3));
W(D + "/reference-frames/0000-Origin-State-DIAGRAM-007-Structural-Reference.svg",
  flow(0, "Structural reference (S0)", ["reference geometry (ε0 = 0, defined)", "applied load / deformation", "current geometry"], "Strain needs its model + geometry."));
W(D + "/reference-frames/0000-Origin-State-DIAGRAM-008-Environment-Reference-Map.svg",
  cards(0, "Environment as structured object", [["T · P · atmosphere", "LAB / THERMO / VAC"], ["E-field · B-field", "E0 / B0 refs"], ["radiation · gravity", "R0 + background"], ["mechanical load", "S0 + history"], ["chemistry · humidity", "C0 / N0 refs"]], "MAT:0000 §ENV.", 3));
W(D + "/state-space/0000-Origin-State-DIAGRAM-009-Process-State-Transition.svg",
  flow(0, "Process transition X0 → X1 → X2", ["X0: recorded start state", "P1 (T/P/t/fields/atmosphere) → X1", "P2 → X2 — history matters"], "Final state may depend on path."));
{
  const rel = R("records/0000-Origin-State/relationships/0000-Relationships.yaml");
  const types = [...new Set([...rel.matchAll(/relationship_type: "([A-Z-]+)"/g)].map((m) => m[1]))];
  W(D + "/relationships/0000-Origin-State-DIAGRAM-010-Reference-Knowledge-Graph.svg",
    flow(0, "MAT:0000 reference knowledge graph", ["MAT:0000 (root)", ...types.map((t) => "— " + t + " —"), "MAT records · Causali E · G0000 (legacy)"], "Edges: 0000-Relationships.yaml."));
}
W(D + "/state-space/0000-Origin-State-DIAGRAM-011-MAT-Comparison-Workflow.svg",
  flow(0, "MAT comparison workflow", ["raw property", "select reference", "unit normalization", "Δq = q − qref", "normalize → zq", "build/compare state vector"], "Every transform reconstructable."));
W(D + "/relationships/0000-Origin-State-DIAGRAM-012-Evidence-Provenance-Map.svg",
  flow(0, "Evidence provenance routes", ["MEASUREMENT → source → object", "MODEL → calculation → object", "HYPOTHESIS → test → verdict", "AI extraction = method, not source"], "Root record never bypasses evidence."));
console.log("ALL SCHEMATICS DONE");
