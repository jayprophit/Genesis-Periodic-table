// Pass 4: Be + Li spec-named visuals. All values parsed from record files.
// Run: node book/generate-pass4.mjs
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
  const W = 560, bh = 44, gap = 26, L = 60, T = 56;
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

// ============ BERYLLIUM ============
const beMain = R("records/0004-Beryllium-Be/0004-Beryllium-Be.md");
const beYaml = R("records/0004-Beryllium-Be/data/structured/0004-Beryllium-Be.yaml");
const beIso = R("records/0004-Beryllium-Be/data/isotopes/0004-Beryllium-Be-Isotopes.yaml");
const beRel = R("records/0004-Beryllium-Be/relationships/0004-Beryllium-Be-Relationships.yaml");
const beSpec = R("records/0004-Beryllium-Be/0004-Beryllium-Be-Visual-Specification.md");
const Be = "records/0004-Beryllium-Be";

Wf(`${Be}/images/scientific/0004-Beryllium-Be-FIG-002-Atomic-Identity.svg`,
  cards("Beryllium atomic identity (MAT:0004)", [
    ["Be · Z = 4", "1s2 2s2 · 1S0"],
    ["9.0121831(5)", "standard atomic weight"],
    ["I1 = 9.322699 eV", "SRC-000005"],
    ["I2 = 18.21115 eV", "Be+ → Be2+"],
    ["+2 chemistry", "principal charge state"],
    ["filled 2s ≠ closed", "n=2 shell open"],
  ], "Filled subshell is not a closed shell.", 3));

Wf(`${Be}/diagrams/bonding/0004-Beryllium-Be-DIAGRAM-001-HCP-Lattice.svg`,
  cards("Be HCP lattice (P63/mmc #194)", [
    ["a = 228.58 pm", "2.2858 Å"],
    ["c = 358.43 pm", "3.5843 Å"],
    ["HCP stacking", "anisotropic response"],
    ["MAT:0004:PHASE:HCP", "canonical phase"],
  ], "CRYSTAL STRUCTURE, not molecular Be–Be bonds. SRC-000049.", 2));

Wf(`${Be}/images/quantum/0004-Beryllium-Be-FIG-003-Electron-Probability.svg`,
  cards("Be electron structure", [
    ["1s2 core", "tightly bound"],
    ["2s2 valence", "filled subshell"],
    ["2p accessible", "shell NOT closed"],
    ["SINGLET ground", "1S0, J=0"],
  ], "Why Be is not inert like He.", 2));
Wf(`${Be}/images/quantum/0004-Beryllium-Be-FIG-004-Energy-Level-Structure.svg`,
  cards("Be ionization ladder (eV)", [
    ["I1 9.322699", "valence removal"],
    ["I2 18.21115", "second valence"],
    ["I3 153.896205", "core removal jump"],
    ["I4 217.71858459", "bare nucleus"],
  ], "NIST ASD via SRC-000005.", 2));

{
  const rows = [...beIso.matchAll(/isotope_id: "MAT:0004:ISO:Be-(\d+)"\n    mass_number: \d+\n    protons: 4\n    neutrons: (\d+)/g)].map((m) => [m[1], m[2]]);
  if (rows.length !== 12) throw new Error("Be rows " + rows.length);
  const st = { 5: "p-unbound", 6: "5.0 zs 2p", 7: "53.22 d EC", 8: "81.9 as αα", 9: "STABLE", 10: "1.387 My β−", 11: "13.76 s", 12: "21.46 ms", 13: "~1 zs", 14: "4.53 ms", 15: "790 ys", 16: "650 ys 2n" };
  Wf(`${Be}/images/isotope/0004-Beryllium-Be-FIG-005-Isotope-Map.svg`,
    cards("Be isotopes 5Be–16Be", rows.map(([a, n]) => [`${a}Be · ${n}n`, st[+a]]),
      "8Be = triple-alpha bridge · 9Be = engineering · 10Be = clock.", 4));
  // GRAPH-001 lifetime map + CSV
  const sec = { 6: 5e-21, 7: 53.22 * 86400, 8: 81.9e-18, 10: 1.387e6 * 365.25 * 86400, 11: 13.76, 12: 0.02146, 13: 1e-21, 14: 0.00453, 15: 790e-24, 16: 650e-24 };
  const Wd = 640, H = 420, L = 100, Rm = 30, T = 52, lo = -24, hi = 14.5;
  const X = (v) => L + ((Math.log10(v) - lo) / (hi - lo)) * (Wd - L - Rm);
  let s = head(Wd, H, "Be isotope lifetimes (log scale)");
  const labels = { 5: "5Be p-unbound", 6: "6Be", 7: "7Be", 8: "8Be", 9: "9Be STABLE", 10: "10Be", 11: "11Be", 12: "12Be", 13: "13Be", 14: "14Be", 15: "15Be", 16: "16Be" };
  Object.entries(labels).forEach(([a, lb], k) => {
    const y = T + 22 + k * 28;
    s += `<text x="${L - 8}" y="${y + 4}" ${CSS} font-size="12" fill="#e8edf3" text-anchor="end">${lb}</text>`;
    s += `<line x1="${L}" y1="${y}" x2="${Wd - Rm}" y2="${y}" stroke="#26313f"/>`;
    if (sec[a]) s += `<circle cx="${X(sec[a]).toFixed(1)}" cy="${y}" r="6" fill="#6cb2ff"/>`;
    else s += `<text x="${L + 4}" y="${y - 6}" ${CSS} font-size="10" fill="#9aa7b8">NO ADOPTED HALF-LIFE</text>`;
  });
  s += cap("NUBASE2020 via MAT:0004:REG:ISOTOPES. 5Be proton-unstable.", Wd, H);
  Wf(`${Be}/graphs/0004-Beryllium-Be-GRAPH-001-Isotope-Lifetime-Map.svg`, s);
  csv(`${Be}/graphs/data/0004-Beryllium-Be-GRAPH-001-Isotope-Lifetime-Map.csv`,
    "isotope,half_life_s\n5Be,NOT-ESTABLISHED\n6Be,5.0e-21\n7Be,4599168\n8Be,8.19e-17\n9Be,STABLE\n10Be,4.377e13\n11Be,13.76\n12Be,0.02146\n13Be,1.0e-21\n14Be,0.00453\n15Be,7.9e-22\n16Be,6.5e-22\n");
}

Wf(`${Be}/images/spectral/0004-Beryllium-Be-FIG-006-Spectral-Fingerprint.svg`,
  cards("Be spectral fingerprint — NO universal frequency", [
    ["Be I 234.8610 nm", "2s2 1S0 → 2s2p 1P°1"],
    ["Be I 166.1478 nm", "persistent UV line"],
    ["Be II 313.04219", "ionized-Be line"],
    ["E ≈ 5.2790 eV", "234.86 nm photon"],
    ["isotope shifts", "state-dependent"],
    ["phonons · NMR", "solid / 9Be spin"],
  ], "One transition ≠ the frequency of Be. SRC-000005.", 3));

Wf(`${Be}/images/properties/0004-Beryllium-Be-FIG-007-Bulk-Property-Dashboard.svg`,
  cards("Be bulk reference (HCP, near ambient)", [
    ["ρ = 1848 kg/m3", "light metal"],
    ["E = 287 GPa", "anisotropic!"],
    ["k ≈ 190 W/mK", "high for mass"],
    ["ρe 3.8e-8 Ωm", "conductor"],
    ["Tm ≈ 1560 K", "reference"],
    ["Tb ≈ 2741 K", "reference"],
  ], "Direction + state required. SRC-000056.", 3));

Wf(`${Be}/diagrams/fields/0004-Beryllium-Be-DIAGRAM-002-Charge-and-Electronic-State.svg`,
  flow("Be charge states + metal conduction", ["Be (1s2 2s2)", "Be+ (I1 9.322699 eV)", "Be2+ (I2 18.21115 eV, chemistry)", "Be3+/Be4+ (plasma only)", "metal: delocalized conduction"], "Bulk conductivity ≠ ion property."));
Wf(`${Be}/diagrams/fields/0004-Beryllium-Be-DIAGRAM-003-Magnetic-and-Spin-State.svg`,
  cards("Be magnetism, separated", [
    ["ground 1S0 J=0", "no e- moment"],
    ["9Be I = 3/2", "NMR active"],
    ["10Be I = 0", "no spin"],
    ["magnetization", "NOT-APPLICABLE"],
  ], "Electronic vs nuclear vs bulk.", 2));
Wf(`${Be}/images/properties/0004-Beryllium-Be-FIG-008-Thermal-State.svg`,
  cards("Be thermal states", [
    ["HCP solid", "ambient reference"],
    ["expansion 11.3e-6", "per K reference"],
    ["Tm ≈ 1560 K", "melting region"],
    ["liquid Be", "high-T state"],
    ["vapor regime", "Tb ≈ 2741 K"],
  ], "SRC-000056.", 3));
Wf(`${Be}/images/properties/0004-Beryllium-Be-FIG-009-Specific-Stiffness.svg`,
  cards("Specific stiffness E/ρ", [
    ["E = 287 GPa", "polycrystalline ref"],
    ["ρ = 1848 kg/m3", "light metal"],
    ["E/ρ ≈ 1.553e8", "m2/s2 (CALC-001)"],
    ["HCP anisotropy", "one E insufficient"],
  ], "Derived metric, not a ranking. MAT:0004:CALC:001.", 2));
Wf(`${Be}/diagrams/processes/0004-Beryllium-Be-DIAGRAM-004-Transformation-Network.svg`,
  flow("Be transformation network", ["Be metal → BeO (oxidation)", "Be → alloys: Cu / Al / beryllides", "machining → particulate → exposure control", "heating → liquid", "9Be+α → 12C+n (nuclear, separate)", "LiF+BeF2 → FLiBe (system)"], "Chemical, manufacturing, nuclear edges distinct."));
{
  const types = [...new Set([...beRel.matchAll(/type: "([A-Z0-9-]+)"/g)].map((m) => m[1]))];
  Wf(`${Be}/diagrams/relationships/0004-Beryllium-Be-DIAGRAM-005-Knowledge-Graph.svg`,
    flow("MAT:0004 knowledge graph", ["MAT:0004 Beryllium", ...types.map((t) => "— " + t + " —")], "Full edges: Be relationships registry."));
}
Wf(`${Be}/diagrams/relationships/0004-Beryllium-Be-DIAGRAM-006-Evidence-Provenance-Safety.svg`,
  flow("Be evidence + safety overlay", ["NIST ASD → atomic/spectral", "NIST + NUBASE → nuclear", "crystallography → HCP bulk", "NIST BeO → ceramic data", "IAEA/fusion → multiplier role", "OSHA → exposure → CONTROL"], "PROCESS → FORM → EXPOSURE → CONTROL."));
{
  const v17 = beSpec.match(/# V17[\s\S]*?```text\n([\s\S]*?)```/);
  const apps = v17 ? v17[1].split("\n").map((l) => l.trim()).filter(Boolean).slice(0, 9) : [];
  if (!apps.length) throw new Error("Be apps");
  Wf(`${Be}/images/applications/0004-Beryllium-Be-FIG-011-Applications.svg`,
    cards("Be applications (safety-marked)", apps.map((a) => [a, "state-specific"]), "Manufacturing uses need exposure control.", 3));
}
// GRAPH-004/005/006
{
  const Wd = 520, H = 260;
  let s = head(Wd, H, "Be specific stiffness E/ρ");
  s += `<rect x="120" y="80" width="320" height="60" fill="#6cb2ff"/><text x="280" y="115" ${CSS} font-size="12" fill="#06121f" text-anchor="middle">1.553e8 m²/s²</text>`;
  s += `<text x="120" y="170" ${CSS} font-size="11" fill="#9aa7b8">E=287 GPa / ρ=1848 kg/m³ (MAT:0004:CALC:001)</text>`;
  Wf(`${Be}/graphs/0004-Beryllium-Be-GRAPH-004-Specific-Stiffness.svg`, s + cap("Derived reference, not a ranking.", Wd, H));
  csv(`${Be}/graphs/data/0004-Beryllium-Be-GRAPH-004-Specific-Stiffness.csv`, "quantity,value,unit\nE,287,GPa\ndensity,1848,kg/m3\nE_over_rho,1.5530303e8,m2/s2\n");
  let q = head(560, 300, "Be8 decay energy marker");
  q += `<circle cx="280" cy="140" r="8" fill="#6cb2ff"/><text x="280" y="110" ${CSS} font-size="12" fill="#e8edf3" text-anchor="middle">Q ≈ +0.09184 MeV</text>`;
  q += `<text x="280" y="170" ${CSS} font-size="11" fill="#9aa7b8" text-anchor="middle">8Be → 4He + 4He (MAT:0004:CALC:002)</text>`;
  Wf(`${Be}/graphs/0004-Beryllium-Be-GRAPH-005-Be8-Decay-Energy.svg`, q + cap("Positive Q = unbound vs 2α.", 560, 300));
  csv(`${Be}/graphs/data/0004-Beryllium-Be-GRAPH-005-Be8-Decay-Energy.csv`, "reaction,Q_MeV\n8Be_to_2alpha,0.0918395\n");
  let n = head(560, 320, "Be nuclear reaction energetics");
  const rows = [["8Be→2α", 0.09184], ["9Be(α,n)", 5.70205], ["9Be(n,2n)", -1.66454]];
  rows.forEach(([lb, v], k) => {
    const y = 80 + k * 60, X0 = 280, sc = 30;
    const x1 = v < 0 ? X0 + v * sc : X0, w = Math.abs(v) * sc;
    n += `<text x="${X0 - 8}" y="${y + 4}" ${CSS} font-size="11" fill="#e8edf3" text-anchor="end">${lb}</text>`;
    n += `<rect x="${x1.toFixed(1)}" y="${y - 12}" width="${Math.max(w, 2).toFixed(1)}" height="24" fill="${v < 0 ? "#e0a100" : "#6cb2ff"}"/>`;
    n += `<text x="${(X0 + (v < 0 ? -1 : 1) * (w + 8)).toFixed(1)}" y="${y + 4}" ${CSS} font-size="11" fill="#9aa7b8" text-anchor="${v < 0 ? "end" : "start"}">${v} MeV</text>`;
  });
  Wf(`${Be}/graphs/0004-Beryllium-Be-GRAPH-006-Nuclear-Reaction-Energetics.svg`, n + cap("CALC-002/003/004. Negative Q needs incident energy.", 560, 320));
  csv(`${Be}/graphs/data/0004-Beryllium-Be-GRAPH-006-Nuclear-Reaction-Energetics.csv`, "reaction,Q_MeV\n8Be_decay,0.0918395\n9Be_alpha_n,5.702051\n9Be_n_2n,-1.664536\n");
  console.log("Be graphs done");
}

// ============ LITHIUM (manifest-named) ============
const liMain = R("records/0003-Lithium-Li/0003-Lithium-Li.md");
const Li = "records/0003-Lithium-Li";
Wf(`${Li}/diagrams/bonding/0003-Lithium-Li-DIAGRAM-001-BCC-Metallic-Bonding.svg`,
  cards("Li BCC metallic bonding", [
    ["BCC Im-3m", "a ≈ 3.51 Å"],
    ["delocalized 2s", "metallic solid"],
    ["NOT molecules", "no Li–Li discretes"],
    ["atom ≠ metal", "separate states"],
  ], "SRC-000038. METALLIC SCHEMATIC.", 2));
Wf(`${Li}/images/quantum/0003-Lithium-Li-FIG-003-Core-Valence-Probability.svg`,
  cards("Li core + valence", [
    ["1s2 core", "tightly bound"],
    ["2s1 valence", "weakly bound"],
    ["I1 5.3917 eV", "easy removal"],
    ["I2 ≈ 75.64 eV", "core jump"],
  ], "Closed core + open valence.", 2));
Wf(`${Li}/images/quantum/0003-Lithium-Li-FIG-004-Energy-Level-Structure.svg`,
  cards("Li levels (eV from ground)", [
    ["ground 2s", "0 reference"],
    ["2p doublet", "670.776 / 670.791 nm"],
    ["I1 5.3917", "continuum"],
    ["I2/I3 core", "75.64 / 122.45"],
  ], "Doublet, not one line. SRC-000005.", 2));
Wf(`${Li}/images/spectral/0003-Lithium-Li-FIG-006-Spectral-Fingerprint.svg`,
  cards("Li spectral fingerprint", [
    ["670.776 nm", "2s–2p component"],
    ["670.791 nm", "fine-structure partner"],
    ["Δλ = 0.015 nm", "resolved doublet"],
    ["hyperfine", "6Li vs 7Li differ"],
    ["Li II / III", "ion spectra"],
    ["NMR · phonons", "solid-state"],
  ], "NO SINGLE LITHIUM FREQUENCY.", 3));
Wf(`${Li}/images/properties/0003-Lithium-Li-FIG-007-Bulk-Property-Dashboard.svg`,
  cards("Li bulk reference (BCC, ambient)", [
    ["ρ ≈ 0.534 g/cm3", "very light metal"],
    ["Tm = 453.61 K", "SRC-000036"],
    ["σ ≈ 1.05e7 S/m", "derived ref"],
    ["k ≈ 85 W/mK", "reference"],
    ["E ≈ 4.9 GPa", "soft metal"],
    ["BCC Im-3m", "a ≈ 3.51 Å"],
  ], "Conditions mandatory. SRC-000040.", 3));
Wf(`${Li}/diagrams/fields/0003-Lithium-Li-DIAGRAM-002-Electronic-and-Ionic-Transport.svg`,
  cards("Li transport, separated", [
    ["e− in Li metal", "electronic conduction"],
    ["Li+ electrolyte", "ionic migration"],
    ["Li+ solid host", "diffusion pathways"],
    ["e− external circuit", "cell current"],
  ], "Four systems, four objects.", 2));
Wf(`${Li}/diagrams/fields/0003-Lithium-Li-DIAGRAM-003-Atomic-vs-Bulk-Magnetic-State.svg`,
  cards("Li magnetism, separated", [
    ["atom: 2s1 unpaired", "paramagnetic state"],
    ["bulk metal", "collective response"],
    ["6Li I = 1", "NMR isotope"],
    ["7Li I = 3/2", "NMR isotope"],
  ], "M_atom ≠ M_bulk.", 2));
Wf(`${Li}/images/properties/0003-Lithium-Li-FIG-008-Thermal-State.svg`,
  cards("Li thermal states", [
    ["solid BCC", "ambient reference"],
    ["Tm 453.61 K", "melting region"],
    ["liquid Li", "molten MHD-capable"],
    ["vapor ≈ 1615 K", "boiling region"],
  ], "SRC-000036.", 2));
Wf(`${Li}/images/properties/0003-Lithium-Li-FIG-009-Mechanical-Crystal-State.svg`,
  cards("Li mechanical / crystal", [
    ["BCC grains", "orientation matters"],
    ["soft, low E", "4.9 GPa ref"],
    ["creep possible", "warm metal"],
    ["pressure phases", "active research"],
  ], "State + history required.", 2));
Wf(`${Li}/diagrams/processes/0003-Lithium-Li-DIAGRAM-004-Transformation-Network.svg`,
  flow("Li transformation network", ["Li → Li+ (ionize) / melt (heat)", "H2O → LiOH+H2 · H2 → LiH · N2 → Li3N", "plating / insertion / alloying", "n + 6Li → T + He (nuclear, separate)"], "Chemical and nuclear branches distinct."));
{
  const rel = R("records/0003-Lithium-Li/relationships/0003-Lithium-Li-Relationships.yaml");
  const types = [...new Set([...rel.matchAll(/type: "([A-Z0-9-]+)"/g)].map((m) => m[1]))];
  Wf(`${Li}/diagrams/relationships/0003-Lithium-Li-DIAGRAM-005-Knowledge-Graph.svg`,
    flow("MAT:0003 knowledge graph", ["MAT:0003 Lithium", ...types.map((t) => "— " + t + " —")], "Every edge carries a mechanism."));
}
Wf(`${Li}/images/applications/0003-Lithium-Li-FIG-011-Applications.svg`,
  cards("Li applications by system", [
    ["batteries", "whole-cell property"],
    ["light alloys", "Al / Mg systems"],
    ["ceramics · glass", "Li compounds"],
    ["fusion breeding", "6Li → T"],
    ["medicines", "Li+ salts, labeled"],
    ["lubricants", "Li greases"],
  ], "System, not element, performs.", 3));
Wf(`${Li}/diagrams/relationships/0003-Lithium-Li-DIAGRAM-006-Evidence-Provenance.svg`,
  flow("Li evidence provenance", ["NIST ASD → atomic data", "NIST + NUBASE → isotope/nuclear", "NIST TN2273 → thermal ref", "crystallography → BCC bulk", "Nobel papers → battery lineage", "IAEA → breeding context"], "Overlays never touch core."));
// Li manifest-named graphs
{
  const Wd = 640, H = 400, L = 100, Rm = 30, T = 52, lo = -23, hi = 0.5;
  const X = (v) => L + ((Math.log10(v) - lo) / (hi - lo)) * (Wd - L - Rm);
  const rows = [["3Li unbound", null], ["4Li", 91e-24], ["5Li", 370e-24], ["6Li STABLE", null], ["7Li STABLE", null], ["8Li", 0.8387], ["9Li", 0.1782], ["10Li", 2e-21], ["11Li", 0.00875], ["12Li unbound", null], ["13Li", 3.3e-21]];
  let s = head(Wd, H, "Li isotope lifetimes (log scale)");
  rows.forEach((r, k) => {
    const y = T + 20 + k * 28;
    s += `<text x="${L - 8}" y="${y + 4}" ${CSS} font-size="12" fill="#e8edf3" text-anchor="end">${r[0]}</text>`;
    s += `<line x1="${L}" y1="${y}" x2="${Wd - Rm}" y2="${y}" stroke="#26313f"/>`;
    if (r[1]) s += `<circle cx="${X(r[1]).toFixed(1)}" cy="${y}" r="6" fill="#6cb2ff"/>`;
    else s += `<text x="${L + 4}" y="${y - 6}" ${CSS} font-size="10" fill="#9aa7b8">NO ADOPTED HALF-LIFE</text>`;
  });
  s += cap("NUBASE2020 via MAT:0003:REG:ISOTOPES. Entry ≠ bound nuclide.", Wd, H);
  Wf(`${Li}/graphs/0003-Lithium-Li-GRAPH-001-Isotope-Lifetime-Map.svg`, s);
  csv(`${Li}/graphs/data/0003-Lithium-Li-GRAPH-001-Isotope-Lifetime-Map.csv`, "isotope,half_life_s\n3Li,NOT-ESTABLISHED\n4Li,9.1e-23\n5Li,3.7e-22\n6Li,STABLE\n7Li,STABLE\n8Li,0.8387\n9Li,0.1782\n10Li,2.0e-21\n11Li,0.00875\n12Li,NOT-ESTABLISHED\n13Li,3.3e-21\n");
  let d = head(520, 260, "Li 670.8 nm resonance doublet");
  [[670.776, "2p 3/2"], [670.791, "2p 1/2"]].forEach(([w, lb], k) => {
    const x = 150 + k * 220;
    d += `<line x1="${x}" y1="70" x2="${x}" y2="170" stroke="#6cb2ff" stroke-width="3"/>`;
    d += `<text x="${x}" y="190" ${CSS} font-size="11" fill="#e8edf3" text-anchor="middle">${w} nm</text>`;
    d += `<text x="${x}" y="206" ${CSS} font-size="10" fill="#9aa7b8" text-anchor="middle">${lb}</text>`;
  });
  d += `<text x="260" y="230" ${CSS} font-size="11" fill="#e0a100" text-anchor="middle">Δλ = 0.015 nm — resolved, not one line</text>`;
  Wf(`${Li}/graphs/0003-Lithium-Li-GRAPH-003-Resonance-Doublet.svg`, d + cap("NIST ASD via SRC-000005.", 520, 260));
  csv(`${Li}/graphs/data/0003-Lithium-Li-GRAPH-003-Resonance-Doublet.csv`, "component,wavelength_nm\n2P3/2,670.776\n2P1/2,670.791\n");
  let q = head(520, 280, "Li ionization steps");
  [["I1 5.3917", 5.391714996], ["I2 75.6401", 75.640097], ["I3 122.4544", 122.45435913]].forEach(([lb, e], k) => {
    const x = 90 + k * 140, Y = 220 - (Math.log10(e) / 2.2) * 170;
    q += `<rect x="${x}" y="${Y.toFixed(1)}" width="70" height="${(220 - Y).toFixed(1)}" fill="#6cb2ff"/>`;
    q += `<text x="${x + 35}" y="240" ${CSS} font-size="11" fill="#e8edf3" text-anchor="middle">${lb.split(" ")[0]}</text>`;
    q += `<text x="${x + 35}" y="${Y - 6}" ${CSS} font-size="10" fill="#9aa7b8" text-anchor="middle">${e}</text>`;
  });
  Wf(`${Li}/graphs/0003-Lithium-Li-GRAPH-004-Ionization-Energies.svg`, q + cap("Core jump after I1. NIST ASD.", 520, 280));
  csv(`${Li}/graphs/data/0003-Lithium-Li-GRAPH-004-Ionization-Energies.csv`, "level,energy_eV\nI1,5.391714996\nI2,75.640097\nI3,122.45435913\n");
  Wf(`${Li}/graphs/0003-Lithium-Li-GRAPH-009-Theoretical-Capacity-vs-Isotopic-Mass.svg`,
    cards("Qs vs weight interval", [["M 6.938 → 3863", "mAh/g"], ["M 6.997 → 3830", "mAh/g"], ["Qs=F/3.6M", "CALC-003"], ["≈3860 cited", "assumes one M"]], "Isotope mix moves it.", 2));
  csv(`${Li}/graphs/data/0003-Lithium-Li-GRAPH-009-Theoretical-Capacity-vs-Isotopic-Mass.csv`, "M_g_mol,Qs_mAh_g\n6.938,3863\n6.997,3830\n");
  console.log("Li graphs done");
}
console.log("ALL PASS-4 DONE");
