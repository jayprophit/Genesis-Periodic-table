// Builds book/scenes/*.json from record lattice/molecular data. Throws on
// missing values. Run: node book/build-scenes.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
const root = join(import.meta.dirname, "..");
const out = join(import.meta.dirname, "scenes");
mkdirSync(out, { recursive: true });
const R = (p) => readFileSync(join(root, p), "utf8").replace(/\r\n/g, "\n");
const F = (re, t, label) => { const m = t.match(re); if (!m) throw new Error("missing: " + label); return m[1]; };

const scenes = [];
function add(id, title, caption, units, atoms, bonds, cell) {
  scenes.push({ id, file: `${id}.json` });
  writeFileSync(join(out, `${id}.json`),
    JSON.stringify({ id, title, caption, units, atoms, bonds, cell }, null, 1));
  console.log("scene " + id);
}

// Li BCC: a ≈ 3.51 Å (record §7). Conventional cubic cell: 8 corners + body center.
{
  const li = R("records/0003-Lithium-Li/0003-Lithium-Li.md");
  if (!li.includes("3.51")) throw new Error("Li lattice parameter missing");
  const A = 3.51;
  const atoms = [];
  for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1])
    atoms.push([x * A, y * A, z * A, "Li corner", "#6cb2ff"]);
  atoms.push([A / 2, A / 2, A / 2, "Li body-center", "#e0a100"]);
  const c = [[0, 0, 0], [A, 0, 0], [A, A, 0], [0, A, 0], [0, 0, A], [A, 0, A], [A, A, A], [0, A, A]];
  const E = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
  add("li-bcc", "Lithium BCC unit cell", "BCC Im-3m, a ≈ 3.51 Å near room temperature (MAT:0003 §7). Corners shared; body center whole.", "angstrom",
    atoms, [], E.map(([a2, b2]) => [c[a2], c[b2]]));
}

// Be HCP: a = 228.58 pm, c = 358.43 pm (structured yaml).
{
  const y = R("records/0004-Beryllium-Be/data/structured/0004-Beryllium-Be.yaml");
  const a = parseFloat(F(/a:\s*\n\s*value: ([\d.]+)/, y, "Be a"));
  const cc = parseFloat(F(/c:\s*\n\s*value: ([\d.]+)/, y, "Be c"));
  const atoms = [];
  for (let layer = 0; layer < 2; layer++)
    for (let k = 0; k < 6; k++) {
      const t = (k / 6) * Math.PI * 2;
      atoms.push([+(a * Math.cos(t)).toFixed(2), +(a * Math.sin(t)).toFixed(2), +(layer * cc).toFixed(2), "Be corner", "#6cb2ff"]);
    }
  atoms.push([0, 0, 0, "Be basal-center A", "#e0a100"]);
  atoms.push([0, 0, cc, "Be basal-center B", "#e0a100"]);
  add("be-hcp", "Beryllium HCP lattice (schematic)", `HCP P63/mmc, a = ${a} pm, c = ${cc} pm (MAT:0004). Corner motif + basal centers; response is anisotropic.`, "picometre",
    atoms, [], []);
}

// B12 icosahedron: IDEALIZED descriptor (record rule: real clusters distorted).
{
  const phi = (1 + Math.sqrt(5)) / 2;
  const raw = [[0,1,phi],[0,1,-phi],[0,-1,phi],[0,-1,-phi],[1,phi,0],[1,-phi,0],[-1,phi,0],[-1,-phi,0],[phi,0,1],[phi,0,-1],[-phi,0,1],[-phi,0,-1]];
  const atoms = raw.map((p, k) => [...p.map((v) => +v.toFixed(3)), `B${k + 1}`, "#6cb2ff"]);
  const bonds = [];
  for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) {
    const d = Math.hypot(...raw[i].map((v, k) => v - raw[j][k]));
    if (d < 2.05) bonds.push([i, j]);
  }
  add("b12-icosahedron", "B12 icosahedral motif (idealized)", "IDEALIZED descriptor only — real B12 clusters are distorted quantum structures (MAT:0005 geometry rule).", "relative",
    atoms, bonds, []);
}

// H2 molecule: re = 0.74144 Å.
{
  const h = R("records/0001-Hydrogen-H/data/structured/0001-Hydrogen-H.yaml");
  const re = parseFloat(F(/value: (0\.74144)/, h, "H2 re"));
  add("h2-molecule", "H2 molecule", `X 1Sigma_g+, equilibrium separation re = ${re} Å (MAT:0001).`, "angstrom",
    [[-re / 2, 0, 0, "H", "#e8edf3"], [re / 2, 0, 0, "H", "#e8edf3"]], [[0, 1]], []);
}

// MAT:0000 reference channels: 15 spokes from the registry.
{
  const reg = R("records/0000-Origin-State/data/reference-states/0000-Reference-State-Registry.yaml");
  const codes = [...reg.matchAll(/code: "([A-Z0-9]+)"/g)].map((m) => m[1]);
  if (codes.length !== 15) throw new Error("channels: " + codes.length);
  const atoms = [[0, 0, 0, "MAT:0000 ORIGIN", "#e0a100"]];
  codes.forEach((c, k) => {
    const t = (k / codes.length) * Math.PI * 2, r1 = 2, r2 = 5;
    atoms.push([+(r2 * Math.cos(t)).toFixed(2), +(r2 * Math.sin(t)).toFixed(2), 0, c, "#6cb2ff"]);
  });
  add("mat0000-refs", "MAT:0000 reference channels", "15 reference channels as spokes (MAT:0000 registry). Computational vs physical status per channel.", "relative",
    atoms, codes.map((_, k) => [0, k + 1]), []);
}

writeFileSync(join(out, "index.json"), JSON.stringify({ scenes }, null, 1));
console.log("scenes index written");
