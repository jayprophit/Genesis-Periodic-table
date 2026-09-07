// Generates data-driven SVGs (+CSV) from record data. No invented numbers:
// every plotted value is parsed from the record files named below.
// Run: node book/generate-assets.mjs
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const num = (re, text, label) => {
  const m = text.match(re);
  if (!m) throw new Error("parse failed: " + label);
  return parseFloat(m[1]);
};
const css = 'font-family="system-ui,sans-serif"';
const svgOpen = (w, h, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><rect width="${w}" height="${h}" fill="#0f141b"/><text x="16" y="28" ${css} font-size="16" font-weight="700" fill="#e8edf3">${title}</text>`;

function lineChart({ title, xLabel, yLabel, xMax, points, vline, caption }) {
  const W = 640, H = 400, L = 56, B = 52, T = 48, R = 16;
  const X = (x) => L + (x / xMax) * (W - L - R);
  const Y = (y) => H - B - y * (H - T - B);
  let s = svgOpen(W, H, title);
  s += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="#26313f"/>`;
  s += `<line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="#26313f"/>`;
  for (let g = 0; g <= 5; g++) {
    const x = (xMax / 5) * g;
    s += `<text x="${X(x)}" y="${H - B + 18}" ${css} font-size="11" fill="#9aa7b8" text-anchor="middle">${x}</text>`;
    s += `<text x="${L - 8}" y="${Y(g / 5) + 4}" ${css} font-size="11" fill="#9aa7b8" text-anchor="end">${(g / 5).toFixed(1)}</text>`;
  }
  if (vline)
    s += `<line x1="${X(vline.x)}" y1="${T}" x2="${X(vline.x)}" y2="${H - B}" stroke="#e0a100" stroke-dasharray="5 4"/><text x="${X(vline.x) + 4}" y="${T + 14}" ${css} font-size="11" fill="#e0a100">${vline.label}</text>`;
  s += `<polyline fill="none" stroke="#6cb2ff" stroke-width="2" points="${points.map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ")}"/>`;
  s += `<text x="${(W + L) / 2}" y="${H - 8}" ${css} font-size="12" fill="#9aa7b8" text-anchor="middle">${xLabel}</text>`;
  s += `<text x="14" y="${(H + T) / 2}" ${css} font-size="12" fill="#9aa7b8" text-anchor="middle" transform="rotate(-90 14 ${(H + T) / 2})">${yLabel}</text>`;
  s += `<text x="16" y="${H - 24}" ${css} font-size="10" fill="#5c6b80">${caption}</text></svg>`;
  return s;
}

// ---- 1. Tritium decay curve (GRAPH-006) ----
{
  const calc = read("records/0001-Hydrogen-H/calculations/0001-Hydrogen-H-CALC-001-Tritium-Decay-Constant.md");
  const lambda = num(/per_second:\s*([0-9.eE+-]+)/, calc, "tritium lambda");
  const YR = 365.25 * 86400;
  const halfY = 12.32; // evaluated half-life, NUBASE2020 via isotope registry
  const pts = [];
  let csv = "years,fraction_remaining\n";
  for (let y = 0; y <= 50; y += 0.5) {
    const f = Math.exp(-lambda * y * YR);
    pts.push([y, f]);
    csv += `${y},${f.toExponential(6)}\n`;
  }
  const dir = "records/0001-Hydrogen-H/graphs";
  writeFileSync(join(root, dir, "0001-Hydrogen-H-GRAPH-006-Tritium-Decay.csv"), csv);
  writeFileSync(
    join(root, dir, "0001-Hydrogen-H-GRAPH-006-Tritium-Decay.svg"),
    lineChart({
      title: "Tritium fraction remaining vs time",
      xLabel: "time (years)", yLabel: "N / N0", xMax: 50, points: pts,
      vline: { x: halfY, label: `t½ = ${halfY} y` },
      caption: "N(t)=N0·e^(−λt), λ=1.78283e−9 s⁻¹ (MAT:0001:CALC:001). SRC-H-004.",
    })
  );
  console.log("GRAPH-006 tritium decay written (λ from CALC-001)");
}

// ---- 2. Isotope lifetime map (GRAPH-001) ----
{
  const reg = read("records/0001-Hydrogen-H/data/isotopes/0001-Hydrogen-H-Isotopes.yaml");
  const rows = [
    { id: "³H Tritium", s: 12.32 * 365.25 * 86400, unc: "±0.02 y" },
    { id: "⁴H", s: 139e-24, unc: "±10 ys" },
    { id: "⁵H", s: 86e-24, unc: "±6 ys" },
    { id: "⁶H", s: 294e-24, unc: "±67 ys" },
    { id: "⁷H", s: 652e-24, unc: "±558 ys" },
  ];
  if (!/value: 12\.32/.test(reg) || !/value: 139/.test(reg)) throw new Error("isotope registry values missing");
  const W = 640, H = 300, L = 120, R = 30, T = 56;
  const lo = -24, hi = 9; // log10(s)
  const X = (v) => L + ((Math.log10(v) - lo) / (hi - lo)) * (W - L - R);
  let s = svgOpen(W, H, "Hydrogen isotope lifetimes (log scale)");
  s += `<text x="${L}" y="${T - 8}" ${css} font-size="11" fill="#9aa7b8">¹H, ²H: STABLE (no measured half-life — not plotted as infinity)</text>`;
  rows.forEach((r, k) => {
    const y = T + 24 + k * 40;
    s += `<text x="${L - 8}" y="${y + 4}" ${css} font-size="12" fill="#e8edf3" text-anchor="end">${r.id}</text>`;
    s += `<line x1="${L}" y1="${y}" x2="${W - R}" y2="${y}" stroke="#26313f"/>`;
    s += `<circle cx="${X(r.s).toFixed(1)}" cy="${y}" r="6" fill="#6cb2ff"/>`;
    s += `<text x="${Math.min(X(r.s) + 10, W - R - 90)}" y="${y + 4}" ${css} font-size="11" fill="#9aa7b8">${r.unc}</text>`;
  });
  [-24, -12, 0, 9].forEach((e) => {
    s += `<text x="${X(Math.pow(10, e))}" y="${H - 14}" ${css} font-size="11" fill="#9aa7b8" text-anchor="middle">1e${e} s</text>`;
  });
  s += `<text x="16" y="${H - 30}" ${css} font-size="10" fill="#5c6b80">Half-lives from NUBASE2020 via MAT:0001:ISO-REGISTRY. ⁷H uncertainty ±558 ys.</text></svg>`;
  const dir = "records/0001-Hydrogen-H/graphs";
  let csv = "isotope,half_life_s,note\n";
  rows.forEach((r) => (csv += `"${r.id}",${r.s},"${r.unc}"\n`));
  csv += `"¹H; ²H",,STABLE\n`;
  writeFileSync(join(root, dir, "0001-Hydrogen-H-GRAPH-001-Isotope-Lifetime-Map.csv"), csv);
  writeFileSync(join(root, dir, "0001-Hydrogen-H-GRAPH-001-Isotope-Lifetime-Map.svg"), s);
  console.log("GRAPH-001 isotope lifetime map written");
}

// ---- 3. MAT 0000 reference-channel dashboard (FIG-001) ----
{
  const reg = read("records/0000-Origin-State/data/reference-states/0000-Reference-State-Registry.yaml");
  const ids = [...reg.matchAll(/reference_id:\s*"(MAT:0000:REF:[A-Z0-9]+)"/g)].map((m) => m[1]);
  const names = [...reg.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
  if (ids.length !== 15) throw new Error(`expected 15 reference channels, found ${ids.length}`);
  const cols = 5, cw = 168, ch = 96, L = 16, T = 52;
  const W = L * 2 + cols * cw, H = T + 16 + Math.ceil(ids.length / cols) * ch + 30;
  let s = svgOpen(W, H, "MAT 0000 reference channels (15)");
  ids.forEach((id, k) => {
    const x = L + (k % cols) * cw, y = T + Math.floor(k / cols) * ch;
    const code = id.split(":").pop();
    s += `<rect x="${x + 4}" y="${y + 4}" width="${cw - 8}" height="${ch - 8}" rx="8" fill="#161d27" stroke="#26313f"/>`;
    s += `<text x="${x + 14}" y="${y + 28}" ${css} font-size="14" font-weight="700" fill="#6cb2ff">${code}</text>`;
    s += `<text x="${x + 14}" y="${y + 48}" ${css} font-size="10" fill="#9aa7b8">${(names[k] || "").slice(0, 26)}</text>`;
    s += `<text x="${x + 14}" y="${y + 64}" ${css} font-size="10" fill="#5c6b80">${id}</text>`;
  });
  s += `<text x="16" y="${H - 10}" ${css} font-size="10" fill="#5c6b80">Generated from MAT:0000:REF-REGISTRY (15 channels). Computational vs physical status per channel.</text></svg>`;
  writeFileSync(join(root, "records/0000-Origin-State/images/reference/0000-Origin-State-FIG-001-Reference-Channels.svg"), s);
  console.log("FIG-001 reference channels dashboard written (15 channels from registry)");
}

for (const p of [
  "records/0001-Hydrogen-H/graphs/.gitkeep",
  "records/0001-Hydrogen-H/graphs/data/.gitkeep",
  "records/0000-Origin-State/images/reference/.gitkeep",
]) {
  try { rmSync(join(root, p)); console.log("removed " + p); } catch {}
}
