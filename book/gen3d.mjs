// Procedural GLB (POINTS + LINES) + viewer scenes from record geometry.
// Only record values or explicitly-labelled idealized constructs.
// Run: node book/gen3d.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = join(import.meta.dirname, "..");
const R = (p) => readFileSync(join(root, p), "utf8").replace(/\r\n/g, "\n");
const W = (p, buf) => { writeFileSync(join(root, p), buf); console.log("wrote " + p); };
const J = (p, obj) => { writeFileSync(join(root, p), JSON.stringify(obj, null, 1)); };

// ---------- minimal GLB writer (POINTS + optional LINES, vertex colors) ----------
function glb(points, lines) {
  const pos = new Float32Array(points.flatMap((p) => p[0]));
  const col = new Float32Array(points.flatMap((p) => p[1]));
  const idx = new Uint16Array(lines.flat());
  const bin = Buffer.concat([Buffer.from(pos.buffer), Buffer.from(col.buffer), Buffer.from(idx.buffer)]);
  const mm = (arr, f) => [0, 1, 2].map((k) => { let a = f === 0 ? Infinity : -Infinity; for (let i = k; i < arr.length; i += 3) a = f === 0 ? Math.min(a, arr[i]) : Math.max(a, arr[i]); return a; });
  const json = {
    asset: { version: "2.0", generator: "MAT-gen3d" },
    scene: 0, scenes: [{ nodes: [0] }], nodes: [{ mesh: 0, name: "mat" }],
    meshes: [{ primitives: [
      { mode: 0, attributes: { POSITION: 0, COLOR_0: 1 }, material: 0 },
      ...(idx.length ? [{ mode: 1, attributes: { POSITION: 0, COLOR_0: 1 }, indices: 2, material: 0 }] : []),
    ] }],
    materials: [{ name: "vcol", pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1] }, extensions: { KHR_materials_vertex_color: {} } }],
    accessors: [
      { bufferView: 0, componentType: 5126, count: pos.length / 3, type: "VEC3", min: mm(pos, 0), max: mm(pos, 1) },
      { bufferView: 1, componentType: 5126, count: col.length / 3, type: "VEC3" },
      ...(idx.length ? [{ bufferView: 2, componentType: 5123, count: idx.length, type: "SCALAR" }] : []),
    ],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: pos.byteLength },
      { buffer: 0, byteOffset: pos.byteLength, byteLength: col.byteLength },
      ...(idx.length ? [{ buffer: 0, byteOffset: pos.byteLength + col.byteLength, byteLength: idx.byteLength }] : []),
    ],
    buffers: [{ byteLength: bin.length }],
  };
  const js = Buffer.from(JSON.stringify(json), "utf8");
  const jsp = Buffer.alloc(Math.ceil(js.length / 4) * 4, 0x20); js.copy(jsp);
  const binp = Buffer.alloc(Math.ceil(bin.length / 4) * 4, 0); bin.copy(binp);
  const total = 12 + 8 + jsp.length + 8 + binp.length;
  const out = Buffer.alloc(total);
  out.write("glTF", 0); out.writeUInt32LE(2, 4); out.writeUInt32LE(total, 8);
  let o = 12;
  out.writeUInt32LE(jsp.length, o); out.writeUInt32LE(0x4e4f534a, o + 4); o += 8;
  jsp.copy(out, o); o += jsp.length;
  out.writeUInt32LE(binp.length, o); out.writeUInt32LE(0x004e4942, o + 4); o += 8;
  binp.copy(out, o);
  return out;
}
const C = {
  H: [0.91, 0.93, 0.95], B: [0.42, 0.7, 1.0], Cc: [0.55, 0.55, 0.6],
  Li: [0.88, 0.63, 1.0], Be: [0.76, 1.0, 0.0],
  O: [1.0, 0.25, 0.2], Fl: [0.45, 1.0, 0.4],
  P: [1, 0.45, 0.1], Nn: [0.6, 0.6, 0.65], gold: [0.88, 0.63, 0.0],
};
let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
function radialCloud(n, P, rmax, color) {
  const pts = [], pmax = P(rmax * 0.35 + 0.01);
  let guard = 0;
  while (pts.length < n && guard++ < n * 200) {
    const r = rnd() * rmax, th = rnd() * Math.PI * 2, ph = Math.acos(2 * rnd() - 1);
    if (rnd() < P(r) / pmax) pts.push([[r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)], color]);
  }
  if (pts.length < n) throw new Error("cloud sampling failed");
  return pts;
}
const P1s = (r) => 4 * r * r * Math.exp(-2 * r);
function bondByDistance(pts, lo, hi) {
  const bonds = [];
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const dd = Math.hypot(...pts[i][0].map((v, k) => v - pts[j][0][k]));
    if (dd >= lo && dd <= hi) bonds.push([i, j]);
  }
  return bonds;
}

const scenes = JSON.parse(R("book/scenes/index.json"));
function addScene(id, title, caption, units, atoms, bonds, cell) {
  const rec = { id, title, caption, units, atoms, bonds, cell };
  J(`book/scenes/${id}.json`, rec);
  const rm = (caption.match(/MAT:(00\d\d)/) || [])[1] || "general";
  if (!scenes.scenes.some((s) => s.id === id)) scenes.scenes.push({ id, file: `${id}.json`, record: rm });
  else scenes.scenes.forEach((s) => { if (s.id === id && !s.record) s.record = rm; });
  console.log("scene " + id);
  return rec;
}
function emit(glbPath, rec) {
  W(glbPath, glb(rec.atoms, rec.bonds));
}

// ---------- H ----------
{
  const pts = radialCloud(1500, P1s, 6, C.H);
  const rec = addScene("h-1s-cloud", "H 1s probability cloud (computed ideal)",
    "1500 points sampled from ideal P(r) = 4r²e^(−2r) (MAT:0001). Computed illustration, not a photograph.", "a0",
    pts, [], []);
  emit("records/0001-Hydrogen-H/models/scientific/0001-Hydrogen-H-MODEL-SCI-001-1s-Probability.glb", rec);
}
{
  const pts = [[[-0.37072, 0, 0], C.H], [[0.37072, 0, 0], C.H]]; // re=0.74144 A (MAT:0001)
  const rec = addScene("h2-nuclei", "H2 nuclei + bond", "Nuclear positions at ±re/2, re = 0.74144 Å (MAT:0001).", "angstrom", pts, [[0, 1]], []);
  emit("records/0001-Hydrogen-H/models/scientific/0001-Hydrogen-H-MODEL-SCI-002-H2-Molecule.glb", rec);
}

// ---------- He ----------
{
  const pts = radialCloud(2000, (r) => 4 * r * r * Math.exp(-4 * r), 3, C.B);
  const rec = addScene("he-1s2-cloud", "He 1s² density (computed ideal)",
    "Ideal hydrogen-like Z=2 radial cloud (MAT:0002 visual spec). Correlation omitted; labelled computed.", "relative",
    pts, [], []);
  emit("records/0002-Helium-He/models/scientific/0002-Helium-He-MODEL-SCI-001-Electron-Density.glb", rec);
}
{
  const pts = [[[0.5, 0.5, 0.5], C.P], [[-0.5, -0.5, 0.5], C.P], [[0.5, -0.5, -0.5], C.Nn], [[-0.5, 0.5, -0.5], C.Nn]];
  const rec = addScene("he4-nucleus-schematic", "He-4 nucleus (schematic)",
    "NUCLEAR SCHEMATIC — 2p+2n positions illustrative, not measured (MAT:0002).", "relative", pts, [], []);
  emit("records/0002-Helium-He/models/scientific/0002-Helium-He-MODEL-SCI-002-Isotope-Nuclear-Schematic.glb", rec);
}

// ---------- Li ----------
{
  const A = 3.51; // a ≈ 3.51 A (MAT:0003 §7)
  if (!R("records/0003-Lithium-Li/0003-Lithium-Li.md").includes("3.51")) throw new Error("Li a");
  const pts = [];
  for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) pts.push([[x * A, y * A, z * A], C.Li]);
  pts.push([[A / 2, A / 2, A / 2], C.gold]);
  const bonds = [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8]];
  const c = pts.slice(0, 8).map((p) => p[0]);
  const cell = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]].map(([a, b]) => [c[a], c[b]]);
  const rec = addScene("li-bcc", "Lithium BCC unit cell", "BCC Im-3m, a ≈ 3.51 Å near room temperature (MAT:0003 §7).", "angstrom", pts, bonds, cell);
  emit("records/0003-Lithium-Li/models/scientific/0003-Lithium-Li-MODEL-SCI-001-BCC-Lattice.glb", rec);
}
{
  const pts = [...radialCloud(900, (r) => 4 * r * r * Math.exp(-6 * r), 2, C.B),
               ...radialCloud(700, (r) => Math.exp(-Math.pow(r - 3.2, 2)), 6, C.Li)];
  const rec = addScene("li-shells-schematic", "Li core + valence shells (schematic)",
    "1s-like core + 2s-like shell; schematic shells, not computed orbitals (MAT:0003).", "relative", pts, [], []);
  emit("records/0003-Lithium-Li/models/scientific/0003-Lithium-Li-MODEL-SCI-002-Atomic-Probability.glb", rec);
}
{
  const pts = [...radialCloud(250, (r) => Math.exp(-r * r * 2), 1.5, C.Li),
               ...radialCloud(250, (r) => Math.exp(-Math.pow(r - 3, 2) / 2), 6, C.gold)];
  const rec = addScene("li11-halo-schematic", "Li-11 halo (schematic)",
    "NUCLEAR DISTRIBUTION SCHEMATIC, not electron-cloud geometry (MAT:0003).", "relative", pts, [], []);
  emit("records/0003-Lithium-Li/models/scientific/0003-Lithium-Li-MODEL-SCI-003-Li11-Halo-Schematic.glb", rec);
}

// ---------- Be ----------
{
  const a = 228.58, c = 358.43; // pm (MAT:0004)
  const t = R("records/0004-Beryllium-Be/data/structured/0004-Beryllium-Be.yaml");
  if (!t.includes("228.58") || !t.includes("358.43")) throw new Error("Be lattice");
  const pts = [];
  for (let L = 0; L < 2; L++) for (let k = 0; k < 6; k++) {
    const th = (k / 6) * Math.PI * 2;
    pts.push([[a * Math.cos(th), a * Math.sin(th), L * c], C.Be]);
  }
  pts.push([[0, 0, 0], C.gold]); pts.push([[0, 0, c], C.gold]);
  const bonds = [];
  for (let L = 0; L < 2; L++) for (let k = 0; k < 6; k++) bonds.push([L * 6 + k, L * 6 + ((k + 1) % 6)]);
  const rec = addScene("be-hcp", "Beryllium HCP lattice", `HCP P63/mmc, a = ${a} pm, c = ${c} pm (MAT:0004).`, "picometre", pts, bonds, []);
  emit("records/0004-Beryllium-Be/models/scientific/0004-Beryllium-Be-MODEL-SCI-001-HCP-Lattice.glb", rec);
}
{
  const pts = radialCloud(1500, (r) => 4 * r * r * Math.exp(-8 * r) + 0.6 * Math.exp(-Math.pow(r - 1.6, 2)), 4, C.Be);
  const rec = addScene("be-shells-schematic", "Be 1s/2s shells (schematic)",
    "1s-like + 2s-like shells; schematic (MAT:0004).", "relative", pts, [], []);
  emit("records/0004-Beryllium-Be/models/scientific/0004-Beryllium-Be-MODEL-SCI-002-Atomic-Probability.glb", rec);
}
{
  const pts = [[[-1.5, 0, 0], C.P], [[-0.9, 0.4, 0], C.P], [[-1.5, 0, 0.1], C.Nn], [[-0.9, -0.4, 0], C.Nn],
               [[1.5, 0, 0], C.P], [[0.9, 0.4, 0], C.P], [[1.5, 0, 0.1], C.Nn], [[0.9, -0.4, 0], C.Nn]];
  const rec = addScene("be8-cluster-schematic", "Be-8 two-alpha cluster (schematic)",
    "NUCLEAR STRUCTURE SCHEMATIC, not literal nucleon positions (MAT:0004).", "relative", pts, [], []);
  emit("records/0004-Beryllium-Be/models/scientific/0004-Beryllium-Be-MODEL-SCI-003-Be8-Cluster-Schematic.glb", rec);
}

// ---------- B ----------
{
  const phi = (1 + Math.sqrt(5)) / 2;
  const raw = [[0,1,phi],[0,1,-phi],[0,-1,phi],[0,-1,-phi],[1,phi,0],[1,-phi,0],[-1,phi,0],[-1,-phi,0],[phi,0,1],[phi,0,-1],[-phi,0,1],[-phi,0,-1]];
  const pts = raw.map((p) => [p, C.Be]);
  const bonds = bondByDistance(pts, 1.9, 2.1);
  if (bonds.length !== 30) throw new Error("B12 edges " + bonds.length);
  const rec = addScene("b12-icosahedron", "B12 icosahedral motif (idealized)",
    "IDEALIZED descriptor — real clusters distorted (MAT:0005 geometry rule).", "relative", pts, bonds, []);
  emit("records/0005-Boron-B/models/scientific/0005-Boron-B-MODEL-SCI-001-B12-Icosahedral-Cluster.glb", rec);
  const g = [...pts.map((p) => [p[0], p[1]]), [[4.5, 0, 0], C.gold], [[5.6, 0, 0], C.gold]];
  const rec2 = addScene("gamma-b28-schematic", "γ-B28 cell schematic",
    "B12 + B2 pair schematic, Pnnm packing (MAT:0005).", "relative", g, [...bonds, [12, 13]], []);
  emit("records/0005-Boron-B/models/scientific/0005-Boron-B-MODEL-SCI-002-Gamma-B28-Cell.glb", rec2);
}

// ---------- C ----------
{
  const d = 1.54, a = (4 * d) / Math.sqrt(3); // derived from record C–C 1.54 A
  const base = [[0,0,0],[0,0.5,0.5],[0.5,0,0.5],[0.5,0.5,0],[0.25,0.25,0.25],[0.25,0.75,0.75],[0.75,0.25,0.75],[0.75,0.75,0.25]];
  const pts = base.map((p) => [p.map((v) => v * a), C.Cc]);
  const bonds = bondByDistance(pts, d * 0.95, d * 1.05);
  // 7 intra-cell bonds; the rest cross the cell boundary (shared with neighbors)
  if (bonds.length !== 7) throw new Error("diamond bonds " + bonds.length);
  const c = pts.map((p) => p[0]);
  const cell = [[0,1],[0,2],[0,3],[4,5],[4,6],[4,7]].map(([x, y]) => [c[x], c[y]]);
  const rec = addScene("diamond-cell", "Diamond conventional cell",
    `C–C 1.54 Å → a ≈ ${a.toFixed(4)} Å derived (MAT:0006).`, "angstrom", pts, bonds, cell);
  emit("records/0006-Carbon-C/models/scientific/0006-Carbon-C-MODEL-SCI-001-Diamond-Lattice.glb", rec);
}
{
  // graphene patch, bond 0.142 nm (MAT:0006)
  const b0 = 0.142, pts = [], idx = {};
  const a1 = [b0 * 3, 0], a2 = [b0 * 1.5, b0 * Math.sqrt(3)];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    const bx = i * a1[0] + j * a2[0], by = i * a1[1] + j * a2[1];
    for (const [dx, dy] of [[0, 0], [b0, 0]]) {
      const k = `${(bx + dx).toFixed(3)},${(by + dy).toFixed(3)}`;
      if (!(k in idx)) { idx[k] = pts.length; pts.push([[bx + dx, by + dy, 0], C.Cc]); }
    }
  }
  const bonds = bondByDistance(pts, b0 * 0.95, b0 * 1.35);
  if (!bonds.length) throw new Error("graphene bonds");
  const rec = addScene("graphene-patch", "Graphene patch (ideal)",
    "Honeycomb, C–C 0.142 nm (MAT:0006). Ideal patch; substrate/defects omitted.", "nanometre", pts, bonds, []);
  emit("records/0006-Carbon-C/models/scientific/0006-Carbon-C-MODEL-SCI-002-Graphite-Graphene.glb", rec);
}
{
  // C60 truncated icosahedron: all perms × signs of 3 base patterns, deduped
  const phi = (1 + Math.sqrt(5)) / 2;
  const pats = [[0, 1, 3 * phi], [2, 1 + 2 * phi, phi], [1, 2 + phi, 2 * phi]];
  const key = (p) => p.map((v) => v.toFixed(6)).join(",");
  const set = new Map();
  const perm3 = (arr) => { const out = []; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { if (j === i) continue; const k = 3 - i - j;
    // even permutations only (truncated icosahedron is chiral-correct this way)
    const inv = (i > j ? 1 : 0) + (i > k ? 1 : 0) + (j > k ? 1 : 0);
    if (inv % 2 === 0) out.push([arr[i], arr[j], arr[k]]); } return out; };
  for (const pat of pats)
    for (const pp of perm3(pat.map(Math.abs)))
      for (const s of [[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]]) {
        const p = [pp[0] * s[0], pp[1] * s[1], pp[2] * s[2]];
        set.set(key(p), p);
      }
  const verts = [...set.values()];
  if (verts.length !== 60) throw new Error("C60 verts " + verts.length);
  const pts = verts.map((p) => [p.map((v) => v * 0.14), C.Cc]); // scale ≈ real C60 radius
  const bonds = bondByDistance(pts, 0.2, 0.36); // raw edge 2 → 0.28 scaled
  if (bonds.length !== 90) throw new Error("C60 edges " + bonds.length);
  const rec = addScene("c60-fullerene", "C60 truncated icosahedron (ideal)",
    "60 atoms, 90 edges verified in-script; idealized cage (MAT:0006).", "relative", pts, bonds, []);
  emit("records/0006-Carbon-C/models/scientific/0006-Carbon-C-MODEL-SCI-003-C60-Fullerene.glb", rec);
}
{
  // (10,10) armchair tube example from graphene geometry
  const n = 10, acc = 0.246, Cc = acc * Math.sqrt(3) * n, Rr = Cc / (2 * Math.PI), T = acc;
  const pts = [];
  for (let ring = 0; ring < 4; ring++)
    for (let k = 0; k < 2 * n; k++) {
      const th = (Math.PI * k) / n + (ring % 2) * (Math.PI / (2 * n));
      pts.push([[Rr * Math.cos(th), Rr * Math.sin(th), ring * (T / 2)], C.Cc]);
    }
  const bonds = bondByDistance(pts, 0.1, 0.17);
  const mean = bonds.reduce((s, [i, j]) => s + Math.hypot(...pts[i][0].map((v, k) => v - pts[j][0][k])), 0) / bonds.length;
  if (!(mean > 0.1 && mean < 0.18)) throw new Error("CNT bond mean " + mean);
  const rec = addScene("cnt-10-10", "(10,10) armchair tube (example)",
    `Ideal example geometry from graphene lattice (MAT:0006); mean bond ${mean.toFixed(3)} nm.`, "nanometre", pts, bonds, []);
  emit("records/0006-Carbon-C/models/scientific/0006-Carbon-C-MODEL-SCI-004-CNT-Chirality.glb", rec);
}

// ---------- O ----------
{
  const t = R("records/0008-Oxygen-O/data/structured/0008-Oxygen-O.yaml");
  if (!t.includes("1.20752")) throw new Error("O2 re missing");
  const re = 1.20752;
  const pts = [[[-re / 2, 0, 0], C.O], [[re / 2, 0, 0], C.O]];
  const rec = addScene("o2-nuclei", "O2 nuclei + bond",
    `Nuclear positions at re/2, re = ${re} A (MAT:0008). Triplet spin not shown in geometry.`, "angstrom", pts, [[0, 1]], []);
  emit("records/0008-Oxygen-O/models/scientific/0008-Oxygen-O-MODEL-SCI-001-O2-Molecule.glb", rec);
}
{
  const t = R("records/0008-Oxygen-O/data/structured/0008-Oxygen-O.yaml");
  if (!t.includes("1.278") || !t.includes("116.8")) throw new Error("O3 geometry missing");
  const r = 1.278, half = (116.8 / 2) * (Math.PI / 180);
  const pts = [[[0, 0, 0], C.O],
    [[-r * Math.sin(half), -r * Math.cos(half), 0], C.O],
    [[r * Math.sin(half), -r * Math.cos(half), 0], C.O]];
  const d = Math.hypot(...pts[1][0].map((v, k) => v - pts[0][0][k]));
  if (Math.abs(d - r) > 1e-9) throw new Error("O3 bond " + d);
  const rec = addScene("o3-nuclei", "O3 bent molecule (experimental geometry)",
    `C2v, r = ${r} A, angle 116.8 deg (MAT:0008, CCCBDB experimental).`, "angstrom", pts, [[0, 1], [0, 2]], []);
  emit("records/0008-Oxygen-O/models/scientific/0008-Oxygen-O-MODEL-SCI-002-O3-Molecule.glb", rec);
}

// ---------- F ----------
{
  const t = R("records/0009-Fluorine-F/data/structured/0009-Fluorine-F.yaml");
  if (!t.includes("1.412")) throw new Error("F2 re missing");
  const re = 1.412;
  const pts = [[[-re / 2, 0, 0], C.Fl], [[re / 2, 0, 0], C.Fl]];
  const rec = addScene("f2-nuclei", "F2 nuclei + bond",
    `Nuclear positions at re/2, re = ${re} A (MAT:0009, NIST diatomic).`, "angstrom", pts, [[0, 1]], []);
  emit("records/0009-Fluorine-F/models/scientific/0009-Fluorine-F-MODEL-SCI-001-F2-Molecule.glb", rec);
}

J("book/scenes/index.json", { scenes: scenes.scenes });
console.log("ALL GEN3D DONE");
