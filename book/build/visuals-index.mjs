// Record visuals index for the in-chapter gallery.
// Writes book/visuals-index.json. Disk truth: GENERATED files render,
// pending slots are listed, never faked.
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { root, writeJson, readText } from "./lib.mjs";

export function buildVisualsIndex() {
  const visuals = [];
  for (const e of readdirSync(join(root, "records"))) {
    const m = e.match(/^(\d{4})-([A-Za-z]+)-([A-Za-z0-9]+)$/);
    if (!m) continue;
    const manDir = join(root, "records", e, "data", "structured");
    let manFile = null;
    try {
      manFile = readdirSync(manDir).find((f) => f.endsWith("-Visual-Manifest.yaml")) || null;
    } catch { continue; }
    if (!manFile) continue;
    const lines = readText(`records/${e}/data/structured/${manFile}`).split("\n");
    const recRoot = join(root, "records", e);
    const locate = (f) => {
      if (/\.png$/i.test(f)) return null;
      for (const d of ["images", "diagrams", "graphs", "models", "tables"]) {
        try {
          const found = [];
          const walk = (dir) => {
            for (const en of readdirSync(dir)) {
              const p = join(dir, en);
              if (statSync(p).isDirectory()) walk(p);
              else if (en === f) found.push(relative(recRoot, p).split(sep).join("/"));
            }
          };
          walk(join(recRoot, d));
          if (found.length) return found[0];
        } catch {}
      }
      return null;
    };
    let pending = [], pendingDesc = "", slotStatus = "";
    const items = [];
    const flush = () => {
      pending.forEach((f) => {
        const at = locate(f);
        items.push({ file: f, path: at ? at.slice(0, at.length - f.length) : "", status: slotStatus || "UNKNOWN", found: !!at, alt: pendingDesc || "" });
      });
      pending = [];
      pendingDesc = "";
    };
    for (const ln of lines) {
      let pm;
      if ((pm = ln.match(/^  V\d+:/))) { flush(); slotStatus = ""; pendingDesc = ""; }
      else if ((pm = ln.match(/^    status: "([^"]+)"/))) { slotStatus = pm[1]; flush(); }
      else if ((pm = ln.match(/^\s*description:\s*"([^"]+)"/))) { pendingDesc = pm[1]; }
      else if ((pm = ln.match(/^\s*alt[-_]?[Tt]ext:\s*"([^"]+)"/))) { pendingDesc = pm[1]; }
      else if ((pm = ln.match(/(?:filename|file): "([^"]+)"/))) pending.push(pm[1]);
      else if ((pm = ln.match(/^\s+-\s+"([^"]+)"/))) pending.push(pm[1]);
    }
    flush();
    if (!items.length) {
      try {
        const walkSvg = (dir, rel2) => {
          for (const en of readdirSync(dir)) {
            const p = join(dir, en);
            if (statSync(p).isDirectory()) walkSvg(p, rel2 + en + "/");
            else if (en.endsWith(".svg")) items.push({ file: en, path: rel2, status: "PRESENT", found: true });
          }
        };
        for (const d of ["images", "diagrams", "graphs"])
          try { walkSvg(join(recRoot, d), d + "/"); } catch {}
      } catch {}
    }
    visuals.push({ record: m[1], dir: `records/${e}`, items });
  }
  writeJson("visuals-index.json", { visuals }, 1);
  console.log(`visuals index: ${visuals.length} records -> book/visuals-index.json`);
}
