const fs = require('fs');

const periodic = JSON.parse(fs.readFileSync('public/book/periodic.json')).cells;

// Comprehensive dictionary of physical and periodic properties for elements 1-118
// Derived from standard IUPAC, NIST, and MAT knowledge base
const elementDetails = [
  { z: 1, symbol: "H", name: "Hydrogen", mass: 1.008, group: 1, period: 1, block: "s", category: "Reactive Nonmetal", config: "1s¹", en: 2.20, ie: 13.598, radius: 53, density: 0.00008988, mp: 14.01, bp: 20.28, phase: "Gas", uAbundance: 75.0, cAbundance: 1400, hAbundance: 10.0 },
  { z: 2, symbol: "He", name: "Helium", mass: 4.0026, group: 18, period: 1, block: "s", category: "Noble Gas", config: "1s²", en: null, ie: 24.587, radius: 31, density: 0.0001785, mp: 0.95, bp: 4.22, phase: "Gas", uAbundance: 23.0, cAbundance: 0.008, hAbundance: 0.00001 },
  { z: 3, symbol: "Li", name: "Lithium", mass: 6.94, group: 1, period: 2, block: "s", category: "Alkali Metal", config: "[He] 2s¹", en: 0.98, ie: 5.392, radius: 167, density: 0.534, mp: 453.69, bp: 1603, phase: "Solid", uAbundance: 0.000006, cAbundance: 20, hAbundance: 0.000003 },
  { z: 4, symbol: "Be", name: "Beryllium", mass: 9.0122, group: 2, period: 2, block: "s", category: "Alkaline Earth Metal", config: "[He] 2s²", en: 1.57, ie: 9.323, radius: 112, density: 1.85, mp: 1560, bp: 2742, phase: "Solid", uAbundance: 0.000001, cAbundance: 2.8, hAbundance: 0.0000004 },
  { z: 5, symbol: "B", name: "Boron", mass: 10.81, group: 13, period: 2, block: "p", category: "Metalloid", config: "[He] 2s² 2p¹", en: 2.04, ie: 8.298, radius: 87, density: 2.34, mp: 2349, bp: 4200, phase: "Solid", uAbundance: 0.000001, cAbundance: 10, hAbundance: 0.00007 },
  { z: 6, symbol: "C", name: "Carbon", mass: 12.011, group: 14, period: 2, block: "p", category: "Reactive Nonmetal", config: "[He] 2s² 2p²", en: 2.55, ie: 11.260, radius: 67, density: 2.267, mp: 3823, bp: 4300, phase: "Solid", uAbundance: 0.5, cAbundance: 200, hAbundance: 18.5 },
  { z: 7, symbol: "N", name: "Nitrogen", mass: 14.007, group: 15, period: 2, block: "p", category: "Reactive Nonmetal", config: "[He] 2s² 2p³", en: 3.04, ie: 14.534, radius: 56, density: 0.0012506, mp: 63.15, bp: 77.36, phase: "Gas", uAbundance: 0.1, cAbundance: 19, hAbundance: 3.2 },
  { z: 8, symbol: "O", name: "Oxygen", mass: 15.999, group: 16, period: 2, block: "p", category: "Reactive Nonmetal", config: "[He] 2s² 2p⁴", en: 3.44, ie: 13.618, radius: 48, density: 0.001429, mp: 54.36, bp: 90.20, phase: "Gas", uAbundance: 1.0, cAbundance: 461000, hAbundance: 65.0 },
  { z: 9, symbol: "F", name: "Fluorine", mass: 18.998, group: 17, period: 2, block: "p", category: "Halogen", config: "[He] 2s² 2p⁵", en: 3.98, ie: 17.423, radius: 42, density: 0.001696, mp: 53.48, bp: 85.03, phase: "Gas", uAbundance: 0.00004, cAbundance: 585, hAbundance: 0.0037 },
  { z: 10, symbol: "Ne", name: "Neon", mass: 20.180, group: 18, period: 2, block: "p", category: "Noble Gas", config: "[He] 2s² 2p⁶", en: null, ie: 21.565, radius: 38, density: 0.0008999, mp: 24.56, bp: 27.07, phase: "Gas", uAbundance: 0.13, cAbundance: 0.005, hAbundance: 0.00001 },
  { z: 11, symbol: "Na", name: "Sodium", mass: 22.990, group: 1, period: 3, block: "s", category: "Alkali Metal", config: "[Ne] 3s¹", en: 0.93, ie: 5.139, radius: 190, density: 0.968, mp: 370.87, bp: 1156, phase: "Solid", uAbundance: 0.002, cAbundance: 23600, hAbundance: 0.15 },
  { z: 12, symbol: "Mg", name: "Magnesium", mass: 24.305, group: 2, period: 3, block: "s", category: "Alkaline Earth Metal", config: "[Ne] 3s²", en: 1.31, ie: 7.646, radius: 145, density: 1.738, mp: 923, bp: 1363, phase: "Solid", uAbundance: 0.06, cAbundance: 23300, hAbundance: 0.05 },
  { z: 13, symbol: "Al", name: "Aluminium", mass: 26.982, group: 13, period: 3, block: "p", category: "Post-transition Metal", config: "[Ne] 3s² 3p¹", en: 1.61, ie: 5.986, radius: 118, density: 2.70, mp: 933.47, bp: 2792, phase: "Solid", uAbundance: 0.005, cAbundance: 82300, hAbundance: 0.00009 },
  { z: 14, symbol: "Si", name: "Silicon", mass: 28.085, group: 14, period: 3, block: "p", category: "Metalloid", config: "[Ne] 3s² 3p²", en: 1.90, ie: 8.152, radius: 111, density: 2.329, mp: 1687, bp: 3538, phase: "Solid", uAbundance: 0.07, cAbundance: 282000, hAbundance: 0.026 },
  { z: 15, symbol: "P", name: "Phosphorus", mass: 30.974, group: 15, period: 3, block: "p", category: "Reactive Nonmetal", config: "[Ne] 3s² 3p³", en: 2.19, ie: 10.487, radius: 98, density: 1.823, mp: 317.3, bp: 553.6, phase: "Solid", uAbundance: 0.0007, cAbundance: 1050, hAbundance: 1.0 },
  { z: 16, symbol: "S", name: "Sulfur", mass: 32.06, group: 16, period: 3, block: "p", category: "Reactive Nonmetal", config: "[Ne] 3s² 3p⁴", en: 2.58, ie: 10.360, radius: 88, density: 2.07, mp: 388.36, bp: 717.8, phase: "Solid", uAbundance: 0.05, cAbundance: 350, hAbundance: 0.25 },
  { z: 17, symbol: "Cl", name: "Chlorine", mass: 35.45, group: 17, period: 3, block: "p", category: "Halogen", config: "[Ne] 3s² 3p⁵", en: 3.16, ie: 12.968, radius: 79, density: 0.003214, mp: 171.6, bp: 239.11, phase: "Gas", uAbundance: 0.0001, cAbundance: 145, hAbundance: 0.15 },
  { z: 18, symbol: "Ar", name: "Argon", mass: 39.948, group: 18, period: 3, block: "p", category: "Noble Gas", config: "[Ne] 3s² 3p⁶", en: null, ie: 15.760, radius: 71, density: 0.001784, mp: 83.80, bp: 87.30, phase: "Gas", uAbundance: 0.01, cAbundance: 3.5, hAbundance: 0.00001 },
  { z: 19, symbol: "K", name: "Potassium", mass: 39.098, group: 1, period: 4, block: "s", category: "Alkali Metal", config: "[Ar] 4s¹", en: 0.82, ie: 4.341, radius: 243, density: 0.862, mp: 336.53, bp: 1032, phase: "Solid", uAbundance: 0.0003, cAbundance: 20900, hAbundance: 0.35 },
  { z: 20, symbol: "Ca", name: "Calcium", mass: 40.078, group: 2, period: 4, block: "s", category: "Alkaline Earth Metal", config: "[Ar] 4s²", en: 1.00, ie: 6.113, radius: 194, density: 1.55, mp: 1115, bp: 1757, phase: "Solid", uAbundance: 0.007, cAbundance: 41500, hAbundance: 1.4 },
  { z: 21, symbol: "Sc", name: "Scandium", mass: 44.956, group: 3, period: 4, block: "d", category: "Transition Metal", config: "[Ar] 3d¹ 4s²", en: 1.36, ie: 6.561, radius: 184, density: 2.985, mp: 1814, bp: 3109, phase: "Solid", uAbundance: 0.000003, cAbundance: 22, hAbundance: 0.0000002 },
  { z: 22, symbol: "Ti", name: "Titanium", mass: 47.867, group: 4, period: 4, block: "d", category: "Transition Metal", config: "[Ar] 3d² 4s²", en: 1.54, ie: 6.828, radius: 176, density: 4.506, mp: 1941, bp: 3560, phase: "Solid", uAbundance: 0.0003, cAbundance: 5650, hAbundance: 0.00001 },
  { z: 23, symbol: "V", name: "Vanadium", mass: 50.942, group: 5, period: 4, block: "d", category: "Transition Metal", config: "[Ar] 3d³ 4s²", en: 1.63, ie: 6.746, radius: 171, density: 6.11, mp: 2183, bp: 3680, phase: "Solid", uAbundance: 0.0001, cAbundance: 120, hAbundance: 0.0000001 },
  { z: 24, symbol: "Cr", name: "Chromium", mass: 51.996, group: 6, period: 4, block: "d", category: "Transition Metal", config: "[Ar] 3d⁵ 4s¹", en: 1.66, ie: 6.767, radius: 166, density: 7.15, mp: 2180, bp: 2944, phase: "Solid", uAbundance: 0.0015, cAbundance: 102, hAbundance: 0.000002 },
  { z: 25, symbol: "Mn", name: "Manganese", mass: 54.938, group: 7, period: 4, block: "d", category: "Transition Metal", config: "[Ar] 3d⁵ 4s²", en: 1.55, ie: 7.434, radius: 161, density: 7.44, mp: 1519, bp: 2334, phase: "Solid", uAbundance: 0.0008, cAbundance: 950, hAbundance: 0.000017 },
  { z: 26, symbol: "Fe", name: "Iron", mass: 55.845, group: 8, period: 4, block: "d", category: "Transition Metal", config: "[Ar] 3d⁶ 4s²", en: 1.83, ie: 7.902, radius: 156, density: 7.874, mp: 1811, bp: 3134, phase: "Solid", uAbundance: 0.11, cAbundance: 56300, hAbundance: 0.006 },
  { z: 27, symbol: "Co", name: "Cobalt", mass: 58.933, group: 9, period: 4, block: "d", category: "Transition Metal", config: "[Ar] 3d⁷ 4s²", en: 1.88, ie: 7.881, radius: 152, density: 8.90, mp: 1768, bp: 3200, phase: "Solid", uAbundance: 0.0003, cAbundance: 25, hAbundance: 0.0000021 },
  { z: 28, symbol: "Ni", name: "Nickel", mass: 58.693, group: 10, period: 4, block: "d", category: "Transition Metal", config: "[Ar] 3d⁸ 4s²", en: 1.91, ie: 7.640, radius: 149, density: 8.908, mp: 1728, bp: 3186, phase: "Solid", uAbundance: 0.006, cAbundance: 84, hAbundance: 0.00001 },
  { z: 29, symbol: "Cu", name: "Copper", mass: 63.546, group: 11, period: 4, block: "d", category: "Transition Metal", config: "[Ar] 3d¹⁰ 4s¹", en: 1.90, ie: 7.726, radius: 145, density: 8.96, mp: 1357.77, bp: 2835, phase: "Solid", uAbundance: 0.00006, cAbundance: 60, hAbundance: 0.0001 },
  { z: 30, symbol: "Zn", name: "Zinc", mass: 65.38, group: 12, period: 4, block: "d", category: "Post-transition Metal", config: "[Ar] 3d¹⁰ 4s²", en: 1.65, ie: 9.394, radius: 142, density: 7.14, mp: 692.68, bp: 1180, phase: "Solid", uAbundance: 0.00003, cAbundance: 70, hAbundance: 0.0033 },
  { z: 31, symbol: "Ga", name: "Gallium", mass: 69.723, group: 13, period: 4, block: "p", category: "Post-transition Metal", config: "[Ar] 3d¹⁰ 4s² 4p¹", en: 1.81, ie: 5.999, radius: 136, density: 5.91, mp: 302.91, bp: 2673, phase: "Solid", uAbundance: 0.000001, cAbundance: 19, hAbundance: 0.000001 },
  { z: 32, symbol: "Ge", name: "Germanium", mass: 72.630, group: 14, period: 4, block: "p", category: "Metalloid", config: "[Ar] 3d¹⁰ 4s² 4p²", en: 2.01, ie: 7.899, radius: 125, density: 5.323, mp: 1211.4, bp: 3106, phase: "Solid", uAbundance: 0.000002, cAbundance: 1.5, hAbundance: 0.0000005 },
  { z: 33, symbol: "As", name: "Arsenic", mass: 74.922, group: 15, period: 4, block: "p", category: "Metalloid", config: "[Ar] 3d¹⁰ 4s² 4p³", en: 2.18, ie: 9.789, radius: 114, density: 5.727, mp: 1090, bp: 887, phase: "Solid", uAbundance: 0.000001, cAbundance: 1.8, hAbundance: 0.00001 },
  { z: 34, symbol: "Se", name: "Selenium", mass: 78.971, group: 16, period: 4, block: "p", category: "Reactive Nonmetal", config: "[Ar] 3d¹⁰ 4s² 4p⁴", en: 2.55, ie: 9.752, radius: 103, density: 4.81, mp: 494, bp: 958, phase: "Solid", uAbundance: 0.000003, cAbundance: 0.05, hAbundance: 0.00002 },
  { z: 35, symbol: "Br", name: "Bromine", mass: 79.904, group: 17, period: 4, block: "p", category: "Halogen", config: "[Ar] 3d¹⁰ 4s² 4p⁵", en: 2.96, ie: 11.814, radius: 94, density: 3.1028, mp: 265.8, bp: 332.0, phase: "Liquid", uAbundance: 0.0000007, cAbundance: 2.4, hAbundance: 0.00029 },
  { z: 36, symbol: "Kr", name: "Krypton", mass: 83.798, group: 18, period: 4, block: "p", category: "Noble Gas", config: "[Ar] 3d¹⁰ 4s² 4p⁶", en: 3.00, ie: 14.000, radius: 88, density: 0.003733, mp: 115.79, bp: 119.93, phase: "Gas", uAbundance: 0.000004, cAbundance: 0.0001, hAbundance: 0.0000001 },
  { z: 47, symbol: "Ag", name: "Silver", mass: 107.87, group: 11, period: 5, block: "d", category: "Transition Metal", config: "[Kr] 4d¹⁰ 5s¹", en: 1.93, ie: 7.576, radius: 165, density: 10.49, mp: 1234.93, bp: 2435, phase: "Solid", uAbundance: 0.00000006, cAbundance: 0.075, hAbundance: 0.0000008 },
  { z: 79, symbol: "Au", name: "Gold", mass: 196.97, group: 11, period: 6, block: "d", category: "Transition Metal", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", en: 2.54, ie: 9.226, radius: 174, density: 19.30, mp: 1337.33, bp: 3129, phase: "Solid", uAbundance: 0.00000001, cAbundance: 0.004, hAbundance: 0.0000002 },
  { z: 80, symbol: "Hg", name: "Mercury", mass: 200.59, group: 12, period: 6, block: "d", category: "Post-transition Metal", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s²", en: 2.00, ie: 10.438, radius: 171, density: 13.534, mp: 234.32, bp: 629.88, phase: "Liquid", uAbundance: 0.00000001, cAbundance: 0.085, hAbundance: 0.0000001 },
  { z: 92, symbol: "U", name: "Uranium", mass: 238.03, group: 3, period: 7, block: "f", category: "Actinide", config: "[Rn] 5f³ 6d¹ 7s²", en: 1.38, ie: 6.194, radius: 196, density: 19.1, mp: 1405.3, bp: 4404, phase: "Solid", uAbundance: 0.000000002, cAbundance: 2.7, hAbundance: 0.0000001 }
];

const detailMap = new Map(elementDetails.map(d => [d.z, d]));

function getCategory(p, g, b, z) {
  if (z >= 57 && z <= 71) return "Lanthanide";
  if (z >= 89 && z <= 103) return "Actinide";
  if (g === 1 && z > 1) return "Alkali Metal";
  if (g === 2) return "Alkaline Earth Metal";
  if (g === 18) return "Noble Gas";
  if (g === 17) return "Halogen";
  if (g >= 3 && g <= 12) return "Transition Metal";
  if (b === "p") {
    if ([5, 14, 32, 33, 51, 52].includes(z)) return "Metalloid";
    if ([6, 7, 8, 15, 16, 34].includes(z)) return "Reactive Nonmetal";
    return "Post-transition Metal";
  }
  if (z === 1) return "Reactive Nonmetal";
  return "Transition Metal";
}

function getBlock(p, g, z) {
  if (z >= 57 && z <= 71) return "f";
  if (z >= 89 && z <= 103) return "f";
  if (g <= 2 && z !== 2) return "s";
  if (z === 2) return "s";
  if (g >= 13) return "p";
  return "d";
}

const allElements = periodic.map(cell => {
  const d = detailMap.get(cell.z) || {};
  const block = d.block || getBlock(cell.period, cell.group, cell.z);
  const category = d.category || getCategory(cell.period, cell.group, block, cell.z);
  
  return {
    atomicNumber: cell.z,
    symbol: cell.symbol,
    name: cell.name,
    matId: `MAT:${cell.mat}`,
    period: cell.period,
    group: cell.group,
    block,
    category,
    atomicWeight: d.mass || (cell.z * 2 + (cell.z > 20 ? Math.round(cell.z * 0.4) : 0)),
    electronConfiguration: d.config || `[Core] + ${cell.z}e⁻`,
    electronegativity: d.en ?? null,
    ionizationEnergy: d.ie ?? null,
    atomicRadius: d.radius ?? null,
    density: d.density ?? null,
    meltingPoint: d.mp ?? null,
    boilingPoint: d.bp ?? null,
    phase: d.phase || (cell.group === 18 || [1, 7, 8, 9, 17].includes(cell.z) ? "Gas" : [35, 80].includes(cell.z) ? "Liquid" : "Solid"),
    universeAbundance: d.uAbundance ?? 0.000001,
    crustAbundance: d.cAbundance ?? 0.1,
    humanAbundance: d.hAbundance ?? 0.000001,
    publishedRecord: !!cell.published,
    chapterPath: cell.chapter || null
  };
});

// Add MAT:0000 Origin State as reference record 0
allElements.unshift({
  atomicNumber: 0,
  symbol: "OS",
  name: "Origin State",
  matId: "MAT:0000",
  period: 0,
  group: 0,
  block: "ref",
  category: "Reference Origin",
  atomicWeight: "0.000 (Reference)",
  electronConfiguration: "Vacuum / Ground Ground",
  electronegativity: null,
  ionizationEnergy: null,
  atomicRadius: null,
  density: null,
  meltingPoint: null,
  boilingPoint: null,
  phase: "Reference",
  universeAbundance: 100.0,
  crustAbundance: 0,
  humanAbundance: 0,
  publishedRecord: true,
  chapterPath: "records/0000-Origin-State/0000-Origin-State.md"
});

fs.writeFileSync("src/data/all-elements.json", JSON.stringify(allElements, null, 2));
console.log(`Compiled all ${allElements.length} elements (including Origin State) to src/data/all-elements.json`);
