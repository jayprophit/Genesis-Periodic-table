// Pass 5: Boron visuals. Bounds stay bounds. Run: node book/generate-pass5.mjs
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

const B = "records/0005-Boron-B";
const bMain = R(`${B}/0005-Boron-B.md`);
const bIso = R(`${B}/data/isotopes/0005-Boron-B-Isotopes.yaml`);
const bRel = R(`${B}/relationships/0005-Boron-B-Relationships.yaml`);

Wf(`${B}/images/scientific/0005-Boron-B-FIG-002-Atomic-Identity.svg`,
  cards("Boron atomic identity (MAT:0005)", [
    ["B · Z = 5", "1s2 2s2 2p1 · 2P°1/2"],
    ["[10.806, 10.821]", "weight interval"],
    ["I1 = 8.298019 eV", "SRC-000005"],
    ["EA = 0.279743 eV", "SRC-000064"],
    ["p-block first", "open shell atom"],
    ["Z=5 → 5 e−", "ATOM:B neutral"],
  ], "First p-orbital element in MAT.", 3));

Wf(`${B}/diagrams/bonding/0005-Boron-B-DIAGRAM-001-Multicentre-Bonding.svg`,
  cards("Boron bonding: 2c-2e vs 3c-2e", [
    ["2c-2e bonds", "conventional, exists"],
    ["3c-2e bonds", "multicentre, exists"],
    ["electron-deficient", "3 valence e−"],
    ["not every bond", "is 3c-2e"],
  ], "Bonding class per bond, not per element.", 2));
Wf(`${B}/diagrams/bonding/0005-Boron-B-DIAGRAM-002-B12-Icosahedral-Motif.svg`,
  cards("B12 icosahedral motif", [
    ["12 atoms", "icosahedral descriptor"],
    ["α-B12", "rhombohedral"],
    ["γ-B28", "B12 + B2 pairs"],
    ["distorted real", "not perfect math"],
  ], "REAL CLUSTERS ≠ PERFECT ICOSAHEDRA.", 2));

Wf(`${B}/images/quantum/0005-Boron-B-FIG-003-Electron-Probability.svg`,
  cards("B electron structure", [
    ["1s2 core", "tightly bound"],
    ["2s2", "filled subshell"],
    ["2p1 valence", "open shell"],
    ["I1–I3 valence", "8.30 / 25.15 / 37.93"],
  ], "Core jump at I4/I5.", 2));
Wf(`${B}/images/quantum/0005-Boron-B-FIG-004-Valence-Bonding-Transition.svg`,
  flow("Atom → cluster/solid electronic state", ["B atom 2s2 2p1", "multicentre bonding", "cluster / solid state"], "No classical orbital paths."));

{
  const names = [...bIso.matchAll(/isotope_id: "MAT:0005:ISO:B-(\d+)"\n    mass_number: \d+\n    protons: 5\n    neutrons: (\d+)/g)].map((m) => [m[1], m[2]]);
  if (names.length !== 16) throw new Error("B rows " + names.length);
  const st = { 6: "p-unbound", 7: "570 ys", 8: "771.9 ms β+", 9: "800 zs", 10: "STABLE n-capture", 11: "STABLE p-fusion", 12: "20.20 ms", 13: "17.16 ms", 14: "12.36 ms", 15: "10.18 ms", 16: ">4.6 zs", 17: "5.08 ms", 18: "<26 ns", 19: "2.92 ms", 20: ">912.4 ys", 21: ">760 ys" };
  Wf(`${B}/images/isotope/0005-Boron-B-FIG-005-Isotope-Map.svg`,
    cards("B isotopes 6B–21B (bounds stay bounds)", names.map(([a, n]) => [`${a}B · ${n}n`, st[+a]]),
      "10B capture · 11B fusion — functions diverge.", 4));
  // GRAPH-001 lifetime map + CSV (bounds drawn as arrows, not points)
  const Wd = 640, H = 560, L = 110, Rm = 40, T = 52, lo = -24, hi = -5;
  const X = (v) => L + ((Math.log10(v) - lo) / (hi - lo)) * (Wd - L - Rm);
  const pts = { 7: 570e-24, 8: 0.7719, 9: 800e-21, 12: 0.0202, 13: 0.01716, 14: 0.01236, 15: 0.01018, 17: 0.00508, 19: 0.00292 };
  const lo2 = { 16: 4.6e-21, 20: 912.4e-24, 21: 760e-24 };
  const hi2 = { 18: 26e-9 };
  let s = head(Wd, H, "B isotope lifetimes (log s; bounds as arrows)");
  const order = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  order.forEach((a, k) => {
    const y = T + 20 + k * 29;
    const lbl = a === 10 || a === 11 ? `${a}B STABLE` : a === 6 ? "6B p-unbound" : `${a}B`;
    s += `<text x="${L - 8}" y="${y + 4}" ${CSS} font-size="12" fill="#e8edf3" text-anchor="end">${lbl}</text>`;
    s += `<line x1="${L}" y1="${y}" x2="${Wd - Rm}" y2="${y}" stroke="#26313f"/>`;
    if (pts[a]) s += `<circle cx="${X(pts[a]).toFixed(1)}" cy="${y}" r="6" fill="#6cb2ff"/>`;
    else if (lo2[a]) { const x = X(lo2[a]); s += `<line x1="${x.toFixed(1)}" y1="${y}" x2="${(x + 40).toFixed(1)}" y2="${y}" stroke="#e0a100" stroke-width="3"/><polygon points="${x + 40},${y - 5} ${x + 40},${y + 5} ${x + 52},${y}" fill="#e0a100"/>`; }
    else if (hi2[a]) { const x = X(hi2[a]); s += `<line x1="${(x - 40).toFixed(1)}" y1="${y}" x2="${x.toFixed(1)}" y2="${y}" stroke="#e0a100" stroke-width="3"/><polygon points="${x - 40},${y - 5} ${x - 40},${y + 5} ${x - 52},${y}" fill="#e0a100"/>`; }
    else s += `<text x="${L + 4}" y="${y - 6}" ${CSS} font-size="10" fill="#9aa7b8">NO ADOPTED HALF-LIFE</text>`;
  });
  s += cap("Gold arrows = bounds (lower ➜ / upper ➚). NUBASE2020 via MAT:0005:REG:ISOTOPES.", Wd, H);
  Wf(`${B}/graphs/0005-Boron-B-GRAPH-001-Isotope-Lifetime-Map.svg`, s);
  csv(`${B}/graphs/data/0005-Boron-B-GRAPH-001-Isotope-Lifetime-Map.csv`,
    "isotope,half_life_s,note\n6B,,PROTON-UNBOUND\n7B,5.7e-22,\n8B,0.7719,\n9B,8.0e-19,\n10B,,STABLE\n11B,,STABLE\n12B,0.0202,\n13B,0.01716\n14B,0.01236\n15B,0.01018\n16B,>4.6e-21,LOWER-BOUND\n17B,0.00508,\n18B,<2.6e-8,UPPER-BOUND\n19B,0.00292,\n20B,>9.124e-22,LOWER-BOUND\n21B,>7.6e-22,LOWER-BOUND\n");
}

Wf(`${B}/images/spectral/0005-Boron-B-FIG-006-Spectral-Fingerprint.svg`,
  cards("B spectral fingerprint", [
    ["182.5894 nm", "B I persistent"],
    ["208.8889 nm", "B I persistent"],
    ["249.6769 nm", "B I ground-pair"],
    ["249.7722 nm", "strong persistent"],
    ["B II 136–162", "ion lines"],
    ["10B/11B NMR", "I=3 / I=3/2"],
  ], "NO SINGLE BORON FREQUENCY. SRC-000079.", 3));

Wf(`${B}/images/properties/0005-Boron-B-FIG-007-State-Dependent-Properties.svg`,
  cards("B properties by allotrope", [
    ["α-B12", "semiconducting"],
    ["β-B106", "disordered network"],
    ["γ-B28 19–89GPa", "B12+B2, Pnnm"],
    ["amorphous B", "process-dependent"],
    ["no universal", "band gap / hardness"],
  ], "State-resolved values only.", 3));

Wf(`${B}/diagrams/fields/0005-Boron-B-DIAGRAM-003-Electronic-and-Doping-State.svg`,
  cards("B electronic / doping states", [
    ["elemental B", "allotrope-dependent"],
    ["B in Si", "acceptor p-type"],
    ["B in diamond", "Tc≈4K emergent"],
    ["metallic B", "extreme pressure"],
  ], "host + concentration + process → carrier.", 2));
Wf(`${B}/diagrams/fields/0005-Boron-B-DIAGRAM-004-Isotope-Spin-and-NMR.svg`,
  cards("B spin / NMR", [
    ["10B I = 3", "NMR active"],
    ["11B I = 3/2", "NMR active"],
    ["ν = γB/2π", "field explicit"],
    ["no field-free", "NMR frequency"],
  ], "Isotope + field required.", 2));
Wf(`${B}/images/properties/0005-Boron-B-FIG-008-Thermal-and-Combustion-State.svg`,
  cards("B thermal / combustion", [
    ["solid → melt", "high-T regime"],
    ["B2O3 formation", "oxidation path"],
    ["oxide-limited", "ignition staged"],
    ["high ΔH ≠ easy", "practical burn"],
  ], "NASA staged-combustion findings.", 2));
Wf(`${B}/images/properties/0005-Boron-B-FIG-009-Cluster-Structural-Geometry.svg`,
  cards("B cluster geometry", [
    ["B12 icosahedra", "core motif"],
    ["rhombohedral link", "α/β networks"],
    ["γ-B28 B12+B2", "NaCl-type packing"],
    ["closo/nido/arachno", "Wade classes"],
  ], "Geometry is causal, not decor.", 2));
Wf(`${B}/diagrams/processes/0005-Boron-B-DIAGRAM-005-Transformation-Network.svg`,
  flow("B transformation network", ["B → γ-B28 (pressure)", "B + H → boranes", "B + C → B4C · B + N → BN", "B + O → B2O3 / glass", "10B+n → Li+He · p+11B → 3α (nuclear, separate)"], "Chemical, material, nuclear classes distinct."));
{
  const types = [...new Set([...bRel.matchAll(/type: "([A-Z0-9-]+)"/g)].map((m) => m[1]))];
  Wf(`${B}/diagrams/relationships/0005-Boron-B-DIAGRAM-006-Knowledge-Graph.svg`,
    flow("MAT:0005 knowledge graph", ["MAT:0005 Boron", ...types.map((t) => "— " + t + " —")], "H–He–Li–Be–B–C connected before C exists."));
}
Wf(`${B}/images/applications/0005-Boron-B-FIG-011-Applications.svg`,
  cards("B applications (isotope-labeled)", [
    ["10B detection", "neutron absorbers"],
    ["B4C ceramics", "hard + absorbing"],
    ["BN materials", "h/c/w forms"],
    ["borosilicate", "low-expansion glass"],
    ["doping", "Si + diamond"],
    ["MgB2", "superconductor cmpd"],
  ], "Nuclear uses need isotope.", 3));
Wf(`${B}/diagrams/relationships/0005-Boron-B-DIAGRAM-007-Evidence-Provenance.svg`,
  flow("B evidence provenance", ["NIST ASD → atomic/spectra", "NIST + NUBASE → isotopes", "neutron data → 10B capture", "Oganov → γ-B28", "Eremets → pressure SC", "ceramics/NASA → materials"], "Overlays outside core."));
// GRAPH-004/005/006
Wf(`${B}/graphs/0005-Boron-B-GRAPH-004-B10-B11-Nuclear-Functions.svg`,
  cards("10B vs 11B functions", [
    ["10B σ≈3835 b", "2200 m/s neutrons"],
    ["10B → Li+He", "Q≈2.790 MeV"],
    ["11B + p → 3α", "Q≈8.682 MeV"],
    ["functions differ", "isotopes diverge"],
  ], "CALC-001/003. Established ≠ commercial.", 2));
csv(`${B}/graphs/data/0005-Boron-B-GRAPH-004-B10-B11-Nuclear-Functions.csv`, "isotope,role,reference\n10B,neutron capture,3835 barn\n11B,proton fusion,Q 8.68211 MeV\n");
Wf(`${B}/graphs/0005-Boron-B-GRAPH-005-B10-Capture-Branches.svg`,
  cards("10B capture branches", [
    ["ground branch", "Q≈2.790 MeV"],
    ["excited 7Li*", "f≈0.937 thermal"],
    ["γ ≈ 0.478 MeV", "metrology line"],
    ["kinetic ≈2.312", "MeV pre-γ"],
  ], "Branching is energy-dependent. CALC-002.", 2));
csv(`${B}/graphs/data/0005-Boron-B-GRAPH-005-B10-Capture-Branches.csv`, "branch,Q_MeV\ntotal,2.7899881\nexcited_kinetic,2.312\ngamma,0.478\n");
Wf(`${B}/graphs/0005-Boron-B-GRAPH-006-pB11-Energetics.svg`,
  cards("p–11B energetics", [
    ["Q ≈ 8.682 MeV", "3α products"],
    ["charged out", "no direct neutrons"],
    ["needs high Ti", "vs D–T (DOE)"],
    ["research stage", "not commercial"],
  ], "CALC-003. Reaction ≠ reactor.", 2));
csv(`${B}/graphs/data/0005-Boron-B-GRAPH-006-pB11-Energetics.csv`, "reaction,Q_MeV\npB11,8.682112\n");
console.log("ALL PASS-5 DONE");
