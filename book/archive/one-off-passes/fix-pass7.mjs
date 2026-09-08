// Pass-7 integrity fixes: only record values. Run: node book/fix-pass7.mjs
import { writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
const root = join(import.meta.dirname, "..");
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
const Wf = (p, c) => { writeFileSync(join(root, p), c); console.log("wrote " + p); };
const Fl = "records/0009-Fluorine-F", O = "records/0008-Oxygen-O";

// F FIG-002: record weight 18.99840316273(92)
Wf(`${Fl}/images/scientific/0009-Fluorine-F-FIG-002-Atomic-Identity.svg`,
  cards("Fluorine atomic identity (MAT:0009)", [
    ["F · Z = 9", "1s2 2s2 2p5 · 2P°3/2"],
    ["18.99840316273(92)", "monoisotopic weight u"],
    ["I1 = 17.42282 eV", "SRC-000157"],
    ["EA = 3.401191 eV", "SRC-000159"],
    ["χ = 3.98 Pauling", "bond polarization"],
    ["one below closed", "2p6 − 1e−"],
  ], "EA ≠ χ.", 3));

// F FIG-007: F2 constants only (record §55) + NMR
Wf(`${Fl}/images/spectral/0009-Fluorine-F-FIG-007-Molecular-NMR-Spectrum.svg`,
  cards("F2 molecular + 19F NMR layer", [
    ["F2 vib 916.93", "cm−1 ωe"],
    ["F2 rot 0.8893", "cm−1 Be"],
    ["19F I=1/2", "100% NMR"],
    ["ν = γB/2π", "field explicit"],
  ], "NO UNIVERSAL F FREQUENCY.", 2));

// F GRAPH-004: F2-only constants; old HF-comparison files removed
rmSync(join(root, `${Fl}/graphs/0009-Fluorine-F-GRAPH-004-F2-HF-Molecular-Comparison.svg`), { force: true });
rmSync(join(root, `${Fl}/graphs/data/0009-Fluorine-F-GRAPH-004-F2-HF-Molecular-Comparison.csv`), { force: true });
Wf(`${Fl}/graphs/0009-Fluorine-F-GRAPH-004-F2-Molecular-Constants.svg`,
  cards("F2 molecular constants (NIST diatomic)", [["re ≈ 1.412 Å", "equilibrium bond"], ["ωe 916.93 cm−1", "vibration"], ["Be ≈ 0.8893 cm−1", "rotation"], ["X1Σg+ ground", "singlet"]], "Record §55; HF needs dataset.", 2));
Wf(`${Fl}/graphs/data/0009-Fluorine-F-GRAPH-004-F2-Molecular-Constants.csv`,
  "constant,value,unit\nre,1.412,angstrom\nomega_e,916.93,cm-1\nB_e,0.8893,cm-1\n");

// F DIAGRAM-002: record geometries only (§I6)
Wf(`${Fl}/diagrams/bonding/0009-Fluorine-F-DIAGRAM-002-Fluoride-Geometries.svg`,
  cards("Record fluoride geometries (§I6)", [
    ["HF linear", "diatomic"],
    ["BF3 trigonal", "planar"],
    ["CF4 tetrahedral", "tetra"],
    ["SF6 octahedral", "octa"],
    ["XeF2 linear", "triatomic"],
    ["XeF4 square", "planar"],
  ], "Only geometries stated in record.", 2));

// F FIG-008: record wording
Wf(`${Fl}/images/properties/0009-Fluorine-F-FIG-008-Physical-State.svg`,
  cards("F2 phases", [
    ["Tm 53.48 K", "solid forms"],
    ["Tb 85.04 K", "normal boiling"],
    ["very pale yellow", "reactive gas"],
    ["cold ≠ inert", "still reactive"],
  ], "SRC-000161.", 2));

// O FIG-007: exact Be
Wf(`${O}/images/spectral/0008-Oxygen-O-FIG-007-Molecular-Spectrum.svg`,
  cards("O molecular spectra", [
    ["O2 vib 1580.193", "cm−1 ωe"],
    ["O2 rot 1.4376766", "cm−1 Be"],
    ["singlet +7918.1", "cm−1 gap"],
    ["O3 1103/701", "+1042 cm−1"],
    ["17O NMR", "I=5/2 probe"],
  ], "NO UNIVERSAL O FREQUENCY.", 3));

// O FIG-009: record Tm/Tb only, no invented critical constants
Wf(`${O}/images/properties/0008-Oxygen-O-FIG-009-Cryogenic-Oxygen.svg`,
  cards("O cryogenics (record values)", [
    ["Tm 54.36 K", "solid forms"],
    ["Tb 90.188 K", "normal boiling"],
    ["LOX oxidizer", "≠ fuel"],
    ["LOX paramagnetic", "triplet liquid"],
  ], "SRC-000129.", 2));
console.log("ALL FIX-PASS7 DONE");
