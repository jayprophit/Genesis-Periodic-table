// Pass 6: Carbon + Nitrogen visuals. Bounds stay bounds; only record values.
// Run: node book/generate-pass6.mjs
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

// ================= CARBON =================
const C = "records/0006-Carbon-C";
const cMain = R(`${C}/0006-Carbon-C.md`);
const cIso = R(`${C}/data/isotopes/0006-Carbon-C-Isotope-Reference.yaml`);
const cRel = R(`${C}/relationships/0006-Carbon-C-Relationships.yaml`);

Wf(`${C}/images/scientific/0006-Carbon-C-FIG-002-Atomic-Identity.svg`,
  cards("Carbon atomic identity (MAT:0006)", [
    ["C · Z = 6", "1s2 2s2 2p2 · 3P0"],
    ["[12.0096, 12.0116]", "weight interval"],
    ["I1 = 11.2602880 eV", "SRC-000005"],
    ["12C mass exact", "defines the dalton"],
    ["13C I = 1/2", "NMR active"],
    ["14C clock", "t½ 5700 y ref"],
  ], "Proton count starts the description.", 3));

{
  if (!cIso.includes("MAT:0006:ISO:C-12") || !cIso.includes("MAT:0006:ISO:C-14")) throw new Error("C key isotopes missing");
  Wf(`${C}/images/isotope/0006-Carbon-C-FIG-005-Isotope-Map.svg`,
    cards("C key isotopes (registry excerpts)", [
      ["12C · 6n STABLE", "mass reference, I=0"],
      ["13C · 7n STABLE", "I=1/2 NMR tracer"],
      ["14C · 8n 5700 y", "β− dating clock"],
      ["11C · 5n ~20 min", "β+ PET tracer"],
      ["full 8C–23C", "registry has bounds"],
      ["bounds ≠ points", "21C/23C estimated"],
    ], "Full chain: Isotope-Reference registry.", 3));
  // lifetime map for well-measured subset + bounds note
  const Wd = 640, H = 380, L = 110, Rm = 40, T = 52;
  const pts = { 8: 3.5e-21, 9: 0.1265, 10: 19.3011, 11: 1220.4, 14: 5700 * 365.25 * 86400, 15: 2.449, 16: 0.75, 17: 0.193, 18: 0.092, 19: 0.0462, 20: 0.016, 22: 0.0062 };
  const lo = -22, hi = 11.5;
  const X = (v) => L + ((Math.log10(v) - lo) / (hi - lo)) * (Wd - L - Rm);
  let s = head(Wd, H, "C isotope lifetimes (log s; selection)");
  const order = [[8, "8C"], [9, "9C"], [10, "10C"], [11, "11C"], [12, "12C STABLE"], [13, "13C STABLE"], [14, "14C"], [15, "15C"], [16, "16C"], [17, "17C"], [18, "18C"], [19, "19C"], [20, "20C"], [21, "21C <30ns"], [22, "22C"], [23, "23C est."]];
  order.forEach(([a, lb], k) => {
    const y = T + 18 + k * 20;
    s += `<text x="${L - 8}" y="${y + 4}" ${CSS} font-size="11" fill="#e8edf3" text-anchor="end">${lb}</text>`;
    s += `<line x1="${L}" y1="${y}" x2="${Wd - Rm}" y2="${y}" stroke="#26313f"/>`;
    if (pts[a]) s += `<circle cx="${X(pts[a]).toFixed(1)}" cy="${y}" r="5" fill="#6cb2ff"/>`;
    else s += `<text x="${L + 4}" y="${y - 5}" ${CSS} font-size="10" fill="#e0a100">BOUND / ESTIMATE ONLY</text>`;
  });
  s += cap("NUBASE2020 via registry. 21C upper bound · 23C estimated.", Wd, H);
  Wf(`${C}/graphs/0006-Carbon-C-GRAPH-001-Isotope-Lifetime-Map.svg`, s);
  csv(`${C}/graphs/data/0006-Carbon-C-GRAPH-001-Isotope-Lifetime-Map.csv`, "isotope,half_life_s,note\n8C,3.5e-21,\n9C,0.1265,\n10C,19.3011,\n11C,1220.4,\n12C,,STABLE\n13C,,STABLE\n14C,1.799e11,5700y\n15C,2.449,\n16C,0.75,\n17C,0.193,\n18C,0.092,\n19C,0.0462,\n20C,0.016,\n21C,<3.0e-8,UPPER-BOUND\n22C,0.0062,\n23C,,ESTIMATED\n");
}

Wf(`${C}/diagrams/bonding/0006-Carbon-C-DIAGRAM-001-sp-sp2-sp3.svg`,
  cards("C bonding models (idealized)", [
    ["sp → 180°", "linear chains"],
    ["sp2 → 120°", "trigonal sheets"],
    ["sp3 → 109.47°", "tetrahedra"],
    ["aromatic", "delocalized rings"],
  ], "Models, not classical orbits.", 2));
Wf(`${C}/diagrams/bonding/0006-Carbon-C-DIAGRAM-002-Topology-Comparison.svg`,
  cards("Same Z, different topology", [
    ["diamond 3D", "sp3 network, hard"],
    ["graphite layered", "anisotropic σ/κ"],
    ["graphene 2D", "Dirac-like"],
    ["CNT (n,m)", "chirality decides"],
    ["C60 cage", "molecular 0D"],
    ["amorphous", "process decides"],
  ], "Topology can switch electronics.", 3));

Wf(`${C}/images/spectral/0006-Carbon-C-FIG-006-Atomic-Spectrum.svg`,
  cards("C I persistent lines (nm)", [
    ["127.72452", "3P0 → 3D°1"],
    ["156.1438", "3P2 → 3D°3"],
    ["165.7008", "3P2 → 3P°2"],
    ["193.0906", "1D2 → 1P°1"],
    ["247.8561", "1S0 → 1P°1"],
    ["C II 68–103", "ion lines"],
  ], "SRC-000098. One line ≠ C frequency.", 3));
Wf(`${C}/images/spectral/0006-Carbon-C-FIG-007-Raman-Fingerprints.svg`,
  cards("Raman state fingerprints (cm−1)", [
    ["diamond ~1332", "first-order line"],
    ["D ~1350", "defect-activated"],
    ["G ~1580", "E2g in-plane"],
    ["2D ~2700", "second-order"],
  ], "Positions move with conditions.", 2));

Wf(`${C}/images/properties/0006-Carbon-C-FIG-008-Allotrope-Property-Comparison.svg`,
  cards("Allotrope divergence", [
    ["diamond", "wide-gap, hard"],
    ["graphite", "semimetal, anisotropic"],
    ["graphene", "Dirac, substrate-hit"],
    ["CNT", "(n,m) decides"],
    ["amorphous", "sp2/sp3 fraction"],
  ], "State-resolved only.", 3));
Wf(`${C}/images/properties/0006-Carbon-C-FIG-009-Dimensionality-Property-Map.svg`,
  flow("Dimensionality ladder", ["0D fullerene cages", "1D nanotubes (n,m)", "2D graphene sheet", "layered graphite", "3D diamond network"], "Dimension is first-class."));
Wf(`${C}/diagrams/fields/0006-Carbon-C-DIAGRAM-003-Electronic-State-Comparison.svg`,
  cards("Electronic states by structure", [
    ["diamond", "wide-gap"],
    ["graphite", "semimetallic"],
    ["graphene", "Dirac-like"],
    ["CNT", "metal / semi"],
  ], "E_C = F(structure,…).", 2));
Wf(`${C}/diagrams/fields/0006-Carbon-C-DIAGRAM-004-Lithium-Graphite-Intercalation.svg`,
  flow("Li intercalation (RESOLVED)", ["graphite host", "Li+ + e− in", "LiC6 stage-1", "reversible ⇄"], "Host property, not Li alone."));
Wf(`${C}/diagrams/fields/0006-Carbon-C-DIAGRAM-005-Isotope-Spin-and-Magnetism.svg`,
  cards("C spin states", [
    ["12C I = 0", "NMR silent"],
    ["13C I = 1/2", "NMR + tracing"],
    ["14C I = 0", "clock, not probe"],
    ["bulk magnetism", "state-dependent"],
  ], "One neutron → new channel.", 2));
Wf(`${C}/images/properties/0006-Carbon-C-FIG-010-Thermal-and-Oxidation.svg`,
  cards("Thermal + oxidation", [
    ["diamond k high", "purity-gated"],
    ["graphite κ∥≫κ⊥", "directional"],
    ["C+O2 → CO2", "ΔH −393.5 kJ/mol"],
    ["O-lean → CO", "product matters"],
  ], "CALC-004 graphite only.", 2));
Wf(`${C}/images/properties/0006-Carbon-C-FIG-011-Diamond-vs-Graphite.svg`,
  cards("Diamond vs graphite", [
    ["sp3 tetrahedra", "hard, insulating"],
    ["sp2 sheets", "soft planes, σ"],
    ["same Z = 6", "different matter"],
    ["process path", "HPHT / CVD"],
  ], "Composition ≠ material.", 2));
Wf(`${C}/images/properties/0006-Carbon-C-FIG-012-Graphene-CNT-Mechanical.svg`,
  cards("Nanocarbon mechanics", [
    ["graphene ~1 TPa", "reference state"],
    ["130 GPa strength", "defect-gated"],
    ["CNT chirality", "property switch"],
    ["substrate counts", "never bare"],
  ], "SRC-000093 references.", 2));
Wf(`${C}/diagrams/processes/0006-Carbon-C-DIAGRAM-006-Transformation-Network.svg`,
  flow("C transformation network", ["structure → allotrope set", "O2 → CO/CO2 (condition)", "H → organics/polymers", "Li → LiC6 intercalation", "metals → carbides/steels", "biology/geology cycle", "3α → stellar 12C (nuclear)"], "Chemical, nuclear branches apart."));
{
  const types = [...new Set([...cRel.matchAll(/type: "([A-Z0-9-]+)"/g)].map((m) => m[1]))];
  Wf(`${C}/diagrams/relationships/0006-Carbon-C-DIAGRAM-007-Knowledge-Graph.svg`,
    flow("MAT:0006 knowledge graph", ["MAT:0006 Carbon", ...types.map((t) => "— " + t + " —")], "Full edges: C relationships registry."));
}
Wf(`${C}/images/applications/0006-Carbon-C-FIG-014-Applications.svg`,
  cards("C applications by state", [
    ["diamond tools", "hardness state"],
    ["graphite electrodes", "σ + refractory"],
    ["graphene devices", "mobility state"],
    ["CNT composites", "chirality-gated"],
    ["steel/carbides", "Fe/C systems"],
    ["14C dating", "5700 y clock"],
  ], "State, not element, applies.", 3));
Wf(`${C}/diagrams/relationships/0006-Carbon-C-DIAGRAM-008-Evidence-Provenance.svg`,
  flow("C evidence provenance", ["NIST ASD → atomic lines", "NIST + NUBASE → isotopes", "BIPM → dalton via 12C", "IAEA → radiocarbon", "Hoyle lit → resonance", "discovery teams → nanoforms"], "Overlays outside core."));
// triple-alpha + C14 decay graphs + CSVs
{
  let s = head(560, 280, "Triple-alpha net energetics");
  s += `<text x="280" y="120" ${CSS} font-size="13" fill="#e8edf3" text-anchor="middle">3 × 4He → 12C</text>`;
  s += `<text x="280" y="150" ${CSS} font-size="16" font-weight="700" fill="#6cb2ff" text-anchor="middle">Q ≈ 7.274748 MeV</text>`;
  s += `<text x="280" y="175" ${CSS} font-size="11" fill="#9aa7b8" text-anchor="middle">via 8Be + Hoyle 7.654 MeV (≠ Q)</text>`;
  Wf(`${C}/graphs/0006-Carbon-C-GRAPH-010-Triple-Alpha-Energetics.svg`, s + cap("CALC-001. Excitation ≠ net Q.", 560, 280));
  csv(`${C}/graphs/data/0006-Carbon-C-GRAPH-010-Triple-Alpha-Energetics.csv`, "quantity,value,unit\nQ,7.274748,MeV\nHoyle_E,7.654,MeV\n");
  const YR = 365.25 * 86400, lam = Math.LN2 / (5700 * YR);
  let d = head(640, 360, "14C fraction remaining vs time");
  let pts = [];
  for (let y = 0; y <= 30000; y += 500) pts.push([y, Math.exp(-lam * y * YR)]);
  const X = (x) => 56 + (x / 30000) * (640 - 56 - 16), Y = (v) => 360 - 52 - v * (360 - 48 - 52);
  d += `<polyline fill="none" stroke="#6cb2ff" stroke-width="2" points="${pts.map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ")}"/>`;
  d += `<text x="348" y="352" ${CSS} font-size="12" fill="#9aa7b8" text-anchor="middle">years</text>`;
  Wf(`${C}/graphs/0006-Carbon-C-GRAPH-011-Carbon-14-Decay.svg`, d + cap("λ from t½ 5700 y (CALC-003). Libby 5568 y is method, not physics.", 640, 360));
  csv(`${C}/graphs/data/0006-Carbon-C-GRAPH-011-Carbon-14-Decay.csv`, "years,fraction\n0,1.0\n5700,0.5\n11400,0.25\n22800,0.0625\n");
  console.log("C graphs done");
}

// ================= NITROGEN =================
const N = "records/0007-Nitrogen-N";
const nMain = R(`${N}/0007-Nitrogen-N.md`);
const nIso = R(`${N}/data/isotopes/0007-Nitrogen-N-Isotopes.yaml`);
Wf(`${N}/images/scientific/0007-Nitrogen-N-FIG-002-Atomic-Identity.svg`,
  cards("Nitrogen atomic identity (MAT:0007)", [
    ["N · Z = 7", "1s2 2s2 2p3 · 4S°3/2"],
    ["[14.00643, 14.00728]", "weight interval"],
    ["I1 = 14.53413 eV", "SRC-000005"],
    ["open-shell atom", "≠ paired N2"],
    ["group 15 p-block", "redox −3…+5"],
  ], "Atomic ≠ molecular magnetism.", 3));
{
  const rows = [...nIso.matchAll(/isotope_id: "MAT:0007:ISO:N-(\d+)"\n    mass_number: \d+\n    protons: 7\n    neutrons: (\d+)/g)].map((m) => [m[1], m[2]]);
  if (rows.length !== 16) throw new Error("N rows " + rows.length);
  const st = { 10: "p-unbound?", 11: "p-rich", 12: "11.0 ms", 13: "9.965 min PET", 14: "STABLE", 15: "STABLE", 16: "7.13 s γ", 17: "4.173 s βn", 18: "619 ms", 19: "336 ms", 20: "136 ms", 21: "85 ms", 22: "23 ms", 23: "13.9 ms", 24: "<52 ns", 25: "<260 ns?" };
  Wf(`${N}/images/isotope/0007-Nitrogen-N-FIG-005-Isotope-Map.svg`,
    cards("N isotopes 10N–25N", rows.map(([a, n]) => [`${a}N · ${n}n`, st[+a]]),
      "24N/25N are limit states, not clocks.", 4));
  const Wd = 640, H = 540, L = 110, Rm = 40, T = 52;
  const pts = { 12: 0.011, 13: 597.9, 16: 7.13, 17: 4.173, 18: 0.6192, 19: 0.336, 20: 0.136, 21: 0.085, 22: 0.023, 23: 0.0139 };
  const lo = -5, hi = 3;
  const X = (v) => L + ((Math.log10(v) - lo) / (hi - lo)) * (Wd - L - Rm);
  let s = head(Wd, H, "N isotope lifetimes (log s; selection)");
  const order = [[10, "10N p-unbound"], [11, "11N"], [12, "12N"], [13, "13N"], [14, "14N STABLE"], [15, "15N STABLE"], [16, "16N"], [17, "17N"], [18, "18N"], [19, "19N"], [20, "20N"], [21, "21N"], [22, "22N"], [23, "23N"], [24, "24N <52ns"], [25, "25N <260ns?"]];
  order.forEach(([a, lb], k) => {
    const y = T + 18 + k * 28;
    s += `<text x="${L - 8}" y="${y + 4}" ${CSS} font-size="11" fill="#e8edf3" text-anchor="end">${lb}</text>`;
    s += `<line x1="${L}" y1="${y}" x2="${Wd - Rm}" y2="${y}" stroke="#26313f"/>`;
    if (pts[a]) s += `<circle cx="${X(pts[a]).toFixed(1)}" cy="${y}" r="5" fill="#6cb2ff"/>`;
    else s += `<text x="${L + 4}" y="${y - 5}" ${CSS} font-size="10" fill="#e0a100">LIMIT / UNBOUND STATE</text>`;
  });
  s += cap("NUBASE2020 via registry. 24N/25N are limits, not clocks.", Wd, H);
  Wf(`${N}/graphs/0007-Nitrogen-N-GRAPH-001-Isotope-Lifetime-Map.svg`, s);
  csv(`${N}/graphs/data/0007-Nitrogen-N-GRAPH-001-Isotope-Lifetime-Map.csv`, "isotope,half_life_s,note\n10N,,PROTON-UNBOUND\n12N,0.011,\n13N,597.9,\n14N,,STABLE\n15N,,STABLE\n16N,7.13,\n17N,4.173,\n18N,0.6192\n19N,0.336\n20N,0.136\n21N,0.085\n22N,0.023\n23N,0.0139\n24N,<5.2e-8,UPPER-BOUND\n25N,<2.6e-7,UPPER-BOUND\n");
}
Wf(`${N}/diagrams/bonding/0007-Nitrogen-N-DIAGRAM-001-N2-Triple-Bond.svg`,
  cards("N2 triple bond (re = 1.097685 Å)", [
    ["N≡N linear", "X1Σg+ ground"],
    ["ωe 2358.57", "cm−1 (SRC-000102)"],
    ["Be 1.998241", "cm−1 rotational"],
    ["D0 ≈ 9.76 eV", "definition-gated"],
  ], "Strong bond → reservoir ≠ feedstock.", 2));
Wf(`${N}/images/properties/0007-Nitrogen-N-FIG-007-Phase-Reference.svg`,
  cards("N2 phases (1 atm refs)", [
    ["Tm ≈ 63.2 K", "solid → liquid"],
    ["Tb = 77.355 K", "normal boiling"],
    ["LN2 coolant", "77 K environment"],
    ["cg-N >110 GPa", "polymeric state"],
  ], "SRC-000104/105.", 2));
Wf(`${N}/diagrams/processes/0007-Nitrogen-N-DIAGRAM-004-Fixation-Network.svg`,
  flow("N2 fixation network", ["N2 reservoir (78%)", "Haber–Bosch → NH3", "biology → NH4+", "nitrification → NO3−", "denitrification → N2"], "Network, not a circle."));
Wf(`${N}/diagrams/relationships/0007-Nitrogen-N-DIAGRAM-005-Knowledge-Graph.svg`,
  cards("N relationship dimensions", [
    ["H ↔ N", "NH3 fixation"],
    ["C ↔ N", "organics + BN? no"],
    ["B ↔ N", "BN materials"],
    ["Li ↔ N", "Li3N ionics"],
    ["O ↔ N", "NOx chemistry"],
    ["cycle", "planetary loop"],
  ], "Mechanism per edge.", 3));
Wf(`${N}/images/applications/0007-Nitrogen-N-FIG-008-Applications.svg`,
  cards("N applications by state", [
    ["LN2 cooling", "77 K environment"],
    ["NH3 fertilizer", "fixed N only"],
    ["nitrides", "BN/AlN/GaN"],
    ["13N PET", "10 min tracer"],
    ["15N tracing", "stable NMR"],
    ["inerting", "N2 blanketing"],
  ], "Fixed N does the work.", 3));
{
  const YR = 365.25 * 86400;
  const lam = Math.LN2 / (9.965 * 60);
  let d = head(560, 300, "13N decay (minutes)");
  let pts = [];
  for (let m = 0; m <= 60; m += 1) pts.push([m, Math.exp(-lam * m * 60)]);
  const X = (x) => 56 + (x / 60) * (560 - 56 - 16), Y = (v) => 300 - 52 - v * (300 - 48 - 52);
  d += `<polyline fill="none" stroke="#6cb2ff" stroke-width="2" points="${pts.map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ")}"/>`;
  d += `<text x="308" y="292" ${CSS} font-size="12" fill="#9aa7b8" text-anchor="middle">minutes (t½ = 9.965)</text>`;
  Wf(`${N}/graphs/0007-Nitrogen-N-GRAPH-002-N13-Decay.svg`, d + cap("β+ → 13C. Short clock, not storage.", 560, 300));
  csv(`${N}/graphs/data/0007-Nitrogen-N-GRAPH-002-N13-Decay.csv`, "minutes,fraction\n0,1.0\n9.965,0.5\n19.93,0.25\n");
}
console.log("ALL PASS-6 DONE");
