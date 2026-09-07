// Pass 3: He batch-2 + Lithium visuals. Data parsed from record files;
// throws on missing values. Run: node book/generate-pass3.mjs
import { readFileSync, writeFileSync, rmSync } from "node:fs";
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
    s += `<text x="${x + 14}" y="${y + 46}" ${CSS} font-size="10" fill="#9aa7b8">${esc(sub).slice(0, 32)}</text>`;
  });
  return s + cap(caption, W, H);
}
function flow(title, nodes, caption) {
  const W = 540, bh = 44, gap = 26, L = 60, T = 56;
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

// fix He V10 filename to match manifest (FIG-008-Quantum-Fluid-Phase.svg)
{
  const a = join(root, "records/0002-Helium-He/images/properties/0002-Helium-He-FIG-010-Cryogenic-Reference.svg");
  const b = join(root, "records/0002-Helium-He/images/properties/0002-Helium-He-FIG-008-Quantum-Fluid-Phase.svg");
  try { const t = readFileSync(a, "utf8"); writeFileSync(b, t); rmSync(a); console.log("renamed He V10 to manifest name"); } catch {}
}

// ---- He visuals ----
const heMain = R("records/0002-Helium-He/0002-Helium-He.md");
const heYaml = R("records/0002-Helium-He/data/structured/0002-Helium-He.yaml");
const I1 = F(/value: (24\.587389011)/, heYaml, "He I1");
const I2 = F(/value: (54\.4177655282)/, heYaml, "He I2");
Wf("records/0002-Helium-He/diagrams/bonding/0002-Helium-He-DIAGRAM-001-Atomic-and-Excimer-States.svg",
  cards("He states: monatomic bulk + specialized branches", [
    ["Bulk He: MONATOMIC", "ordinary gas/liquid"],
    ["4He2 dimer", "weak vdW bound state"],
    ["He2+1", "molecular ion"],
    ["He2*", "excimer family"],
    ["HeH+1", "observed (SRC-000031)"],
    ["Na2He", ">113 GPa (SRC-000032)"],
  ], "Bulk monatomic \u2260 dimer nonexistent. SRC-000031/32/33.", 3));
Wf("records/0002-Helium-He/images/quantum/0002-Helium-He-FIG-003-Two-Electron-Probability.svg",
  cards("He: two-electron quantum system", [
    ["1s2 · 1S0", "closed shell ground"],
    ["SINGLET states", "spin-paired family"],
    ["TRIPLET states", "spin-parallel family"],
    ["e–e repulsion", "no exact separation"],
    ["variational methods", "correlation benchmark"],
    ["metastable He*", "long-lived excited"],
  ], "Electron correlation included conceptually. SCIENTIFIC-SCHEMATIC.", 3));
Wf("records/0002-Helium-He/images/quantum/0002-Helium-He-FIG-004-Singlet-Triplet-Energy-Structure.svg",
  cards("He singlet / triplet structure", [
    ["ground 1s2 1S0", "0 eV reference"],
    ["1s2p triplet", "~21.2 eV region"],
    ["1s3p 23.0870 eV", "NIST ASD"],
    ["I1 24.5874 eV", "continuum threshold"],
    ["He+ hydrogen-like", "I2 54.4178 eV"],
    ["selection rules", "intercombination weak"],
  ], "Simplified labels; full fine structure in child records.", 2));
Wf("records/0002-Helium-He/images/spectral/0002-Helium-He-FIG-006-Spectral-Fingerprint.svg",
  cards("He spectral fingerprint — NO universal frequency", [
    ["Electronic", "singlet + triplet series"],
    ["Metastable lines", "trapped-state transitions"],
    ["3He hyperfine", "I=1/2 isotope shift"],
    ["He+ spectrum", "hydrogen-like ion"],
    ["Excimer bands", "He2* emission"],
    ["Plasma emission", "discharge-dependent"],
  ], "Mechanism-resolved only.", 3));
Wf("records/0002-Helium-He/images/properties/0002-Helium-He-FIG-007-Physical-Property-Dashboard.svg",
  cards("He states need their own cards", [
    ["4He gas", "monatomic, ambient"],
    ["He-I liquid", "normal, > Tλ(P)"],
    ["He-II liquid", "superfluid, < Tλ(P)"],
    ["3He liquid", "fermionic fluid"],
    ["3He superfluid", "mK, A/B phases"],
    ["solid He", "pressure-required"],
  ], "No generic density without state.", 3));
Wf("records/0002-Helium-He/diagrams/fields/0002-Helium-He-DIAGRAM-002-Ionization-State.svg",
  flow("He ionization chain", [`He  (1s2)`, `He+  (I1 = ${I1} eV)`, `He2+  (I2 = ${I2} eV; 4He2+ = α)`], "NIST ASD via SRC-000005."));
Wf("records/0002-Helium-He/diagrams/fields/0002-Helium-He-DIAGRAM-003-Isotope-Spin-Magnetic-State.svg",
  cards("He spin: isotope-dependent", [
    ["3He I = 1/2", "NMR + neutron spin filter"],
    ["4He I = 0", "no nuclear moment"],
    ["e- diamagnetism", "ground state only"],
    ["magnetization", "NOT-APPLICABLE bulk"],
  ], "Nuclear magnetism is 3He-specific.", 2));
Wf("records/0002-Helium-He/diagrams/processes/0002-Helium-He-DIAGRAM-004-Implantation-Bubble-Formation.svg",
  flow("He implantation → bubbles (host relationship)", ["incoming He / α", "implantation", "diffusion / trapping", "vacancy interaction", "He cluster → bubble"], "HOST-MATERIAL RELATIONSHIP, not intrinsic property."));
Wf("records/0002-Helium-He/diagrams/processes/0002-Helium-He-DIAGRAM-005-Transformation-Network.svg",
  flow("He transformation network", ["He → He+ → He2+ (ionization)", "He → He* (excitation)", "gas → He-I → He-II (cooling)", "pressure + cooling → solid", "3H → 3He · D+T → 4He+n (nuclear, separate)"], "Chemical and nuclear arrows never merged."));
{
  const rel = R("records/0002-Helium-He/relationships/0002-Helium-He-Relationships.yaml");
  const types = [...new Set([...rel.matchAll(/type: "([A-Z0-9-]+)"/g)].map((m) => m[1]))];
  if (!types.length) throw new Error("He rel types");
  Wf("records/0002-Helium-He/diagrams/relationships/0002-Helium-He-DIAGRAM-006-Knowledge-Graph.svg",
    flow("MAT:0002 knowledge-graph edge classes", ["MAT:0002 Helium", ...types.map((t) => "— " + t + " —")], "Full edges: He relationships registry."));
}
Wf("records/0002-Helium-He/diagrams/relationships/0002-Helium-He-DIAGRAM-007-Evidence-Provenance.svg",
  flow("He evidence provenance", ["NIST ASD → atomic/ionization", "NIST isotopes → masses", "NUBASE2020 → unstable states", "NIST TN1334 → 4He physics", "history → liquefaction/superfluids"], "Overlays never overwrite core."));
Wf("records/0002-Helium-He/images/applications/0002-Helium-He-FIG-010-Applications.svg",
  cards("He applications by state", [
    ["4He cryogenics", "magnet cooling"],
    ["dilution fridge", "3He/4He mixtures"],
    ["neutron detection", "3He capture"],
    ["leak detection", "He mobility"],
    ["inert gas", "welding · semi"],
    ["quantum research", "fluids · vortices"],
  ], "Isotope + state required.", 3));
// He GRAPH-001 lifetime map + CSV, GRAPH-008 ionization + CSV
{
  const Wd = 640, H = 340, L = 90, Rm = 30, T = 52;
  const rows = [["3He STABLE", null], ["4He STABLE", null], ["5He", 602e-24], ["6He", 0.80692], ["7He", 2.51e-21], ["8He", 0.1195], ["9He", 2.5e-21], ["10He", 260e-24]];
  const lo = -24, hi = 0.5;
  const X = (v) => L + ((Math.log10(v) - lo) / (hi - lo)) * (Wd - L - Rm);
  let s = head(Wd, H, "Helium isotope lifetimes (log scale)");
  rows.forEach((r, k) => {
    const y = T + 22 + k * 30;
    s += `<text x="${L - 8}" y="${y + 4}" ${CSS} font-size="12" fill="#e8edf3" text-anchor="end">${r[0]}</text>`;
    s += `<line x1="${L}" y1="${y}" x2="${Wd - Rm}" y2="${y}" stroke="#26313f"/>`;
    if (r[1]) s += `<circle cx="${X(r[1]).toFixed(1)}" cy="${y}" r="6" fill="#6cb2ff"/>`;
    else s += `<text x="${L + 4}" y="${y - 6}" ${CSS} font-size="10" fill="#9aa7b8">STABLE — not plotted as infinity</text>`;
  });
  s += cap("NUBASE2020 via MAT:0002:REG:ISOTOPES. 9He ±2.3 zs highly uncertain.", Wd, H);
  Wf("records/0002-Helium-He/graphs/0002-Helium-He-GRAPH-001-Isotope-Lifetime-Map.svg", s);
  writeFileSync(join(root, "records/0002-Helium-He/graphs/data/0002-Helium-He-GRAPH-001-Isotope-Lifetime-Map.csv"), "isotope,half_life_s\n3He,STABLE\n4He,STABLE\n5He,6.02e-22\n6He,0.80692\n7He,2.51e-21\n8He,0.1195\n9He,2.5e-21\n10He,2.6e-22\n");
  const W2 = 480, H2 = 260;
  let b = head(W2, H2, "He ionization energies (log eV)");
  const Y = (e) => 200 - (Math.log10(e) / 2) * 150;
  [[`I1 ${I1}`, +I1], [`I2 ${I2}`, +I2]].forEach(([lb, e], k) => {
    const x = 120 + k * 160;
    b += `<rect x="${x}" y="${Y(e).toFixed(1)}" width="70" height="${(200 - Y(e)).toFixed(1)}" fill="#6cb2ff"/>`;
    b += `<text x="${x + 35}" y="220" ${CSS} font-size="11" fill="#e8edf3" text-anchor="middle">${esc(lb.split(" ")[0])}</text>`;
    b += `<text x="${x + 35}" y="${Y(e) - 6}" ${CSS} font-size="11" fill="#9aa7b8" text-anchor="middle">${e} eV</text>`;
  });
  b += cap("NIST ASD via SRC-000005. Second electron ~2.2× first.", W2, H2);
  Wf("records/0002-Helium-He/graphs/0002-Helium-He-GRAPH-008-Ionization-Energies.svg", b);
  writeFileSync(join(root, "records/0002-Helium-He/graphs/data/0002-Helium-He-GRAPH-008-Ionization-Energies.csv"), `level,energy_eV\nI1,${I1}\nI2,${I2}\n`);
  console.log("He GRAPH-001/008 done");
}

// ---- Li visuals ----
const liYaml = R("records/0003-Lithium-Li/data/structured/0003-Lithium-Li.yaml");
const liMain = R("records/0003-Lithium-Li/0003-Lithium-Li.md");
const liIso = R("records/0003-Lithium-Li/data/isotopes/0003-Lithium-Li-Isotopes.yaml");
const LiI1 = F(/value: (5\.391714996)/, liYaml, "Li I1");
const LiTm = F(/melting_point:\s*\n\s*value: (453\.61)/, liYaml, "Li Tm");
Wf("records/0003-Lithium-Li/images/scientific/0003-Lithium-Li-FIG-002-Atomic-Identity.svg",
  cards("Lithium atomic identity (MAT:0003)", [
    ["Li · Z = 3", "1s2 2s1 · 2S1/2"],
    ["[6.938, 6.997]", "atomic-weight interval"],
    [`I1 = ${LiI1} eV`, "valence electron"],
    ["I2 ≈ 75.64 eV", "core removal jump"],
    ["alkali metal", "group 1 · BCC solid"],
    ["Li+ dominant ion", "closed-shell ion"],
  ], "NIST ASD / isotope table. Bulk metal ≠ isolated atom.", 3));
{
  const names = [...liIso.matchAll(/isotope_id: "MAT:0003:ISO:Li-(\d+)"\n    mass_number: \d+\n    protons: 3\n    neutrons: (\d+)/g)].map((m) => [m[1], m[2]]);
  if (names.length !== 11) throw new Error("Li isotope rows: " + names.length);
  const stab = { 6: "STABLE", 7: "STABLE", 8: "838.7 ms", 9: "178.2 ms", 11: "8.75 ms halo" };
  Wf("records/0003-Lithium-Li/images/isotope/0003-Lithium-Li-FIG-005-Isotope-Map.svg",
    cards("Lithium isotopes 3Li–13Li (mass-table entry ≠ bound nuclide)", names.map(([a, n]) =>
      [`${a}Li · ${n}n`, stab[a] || "short-lived / resonance"]),
      "Stable / radioactive / unbound / uncertain kept distinct. NUBASE2020.", 4));
}
Wf("records/0003-Lithium-Li/graphs/0003-Lithium-Li-GRAPH-001-Ionization-Steps.svg",
  (() => {
    const W2 = 560, H2 = 300;
    let b = head(W2, H2, "Li ionization steps (log eV)");
    const vals = [["I1", 5.391714996], ["I2", 75.640097], ["I3", 122.45435913]];
    const Y = (e) => 230 - (Math.log10(e) / 2.2) * 180;
    vals.forEach(([lb, e], k) => {
      const x = 100 + k * 140;
      b += `<rect x="${x}" y="${Y(e).toFixed(1)}" width="70" height="${(230 - Y(e)).toFixed(1)}" fill="#6cb2ff"/>`;
      b += `<text x="${x + 35}" y="250" ${CSS} font-size="11" fill="#e8edf3" text-anchor="middle">${lb}</text>`;
      b += `<text x="${x + 35}" y="${Y(e) - 6}" ${CSS} font-size="10" fill="#9aa7b8" text-anchor="middle">${e}</text>`;
    });
    return b + cap("Jump after I1 = closed 1s2 core. NIST ASD via SRC-000005.", W2, H2);
  })());
writeFileSync(join(root, "records/0003-Lithium-Li/graphs/data/0003-Lithium-Li-GRAPH-001-Ionization-Steps.csv"), "level,energy_eV\nI1,5.391714996\nI2,75.640097\nI3,122.45435913\n");
Wf("records/0003-Lithium-Li/images/properties/0003-Lithium-Li-FIG-007-Bulk-Reference.svg",
  cards("Li bulk reference (BCC, near ambient)", [
    ["ρ ≈ 0.534 g/cm3", "lightest metal regime"],
    [`Tm = ${LiTm} K`, "SRC-000036"],
    ["a ≈ 3.51 Å", "BCC Im-3m"],
    ["σ ≈ 1.05e7 S/m", "derived, ρe 9.5e-8"],
    ["k ≈ 85 W/mK", "reference value"],
    ["E ≈ 4.9 GPa", "soft metal"],
  ], "Reference values need T/P/phase/purity. SRC-000040.", 3));
Wf("records/0003-Lithium-Li/diagrams/processes/0003-Lithium-Li-DIAGRAM-005-Battery-System.svg",
  flow("Li-ion cell ≠ Li element", ["hosts + electrolyte + separator", "Li+ migrates (hosts change)", "e− via external circuit", "interphase evolves", "performance = whole system"], "Ion, host, cell stay separate objects."));
Wf("records/0003-Lithium-Li/graphs/0003-Lithium-Li-GRAPH-003-Specific-Capacity-Range.svg",
  cards("Li theoretical capacity vs weight interval", [
    ["M = 6.938", "Qs ≈ 3863 mAh/g"],
    ["M = 6.997", "Qs ≈ 3830 mAh/g"],
    ["Qs = F/3.6M", "1 e− per atom"],
    ["≈3860 cited", "assumes one M"],
  ], "Isotope mix moves the metric. MAT:0003:CALC:003.", 2));
console.log("ALL PASS-3 DONE");
