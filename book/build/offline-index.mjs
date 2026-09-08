// Offline index: every local resource for a complete book save.
// Writes book/offline-index.json. External services excluded.
import { writeJson, readJson } from "./lib.mjs";

export function buildOfflineIndex(manifest) {
  const chapters = [];
  manifest.chapters.forEach((sec) => sec.items.forEach((it) => chapters.push(it.path)));
  const vidx = readJson("visuals-index.json", { visuals: [] });
  const figures = [];
  for (const v of vidx.visuals || []) for (const it of v.items || [])
    if (it.found && /\.svg$/i.test(it.file)) figures.push(`../${v.dir}/${it.path}${it.file}`);
  let scenes = [];
  const si = readJson("scenes/index.json", { scenes: [] });
  scenes = (si.scenes || []).map((s) => `./scenes/${s.file}`);
  const app = ["./", "./index.html", "./3d.html", "./styles.css", "./book.js", "./reader-core.mjs",
    "./math-config.js", "./manifest.json", "./search-index.json", "./visuals-index.json",
    "./elements.json", "./identities.json", "./periodic.json", "./offline-index.json",
    "./manifest.webmanifest", "./scenes/index.json",
    "./vendor/marked.mjs", "./vendor/tex-svg.js", "./vendor/three.module.js", "./vendor/OrbitControls.js"];
  const all = [...new Set([...app, ...chapters, ...figures, ...scenes])];
  writeJson("offline-index.json", { app, chapters, figures, scenes, all }, 1);
  console.log(`offline: ${all.length} resources (${chapters.length} chapters, ${figures.length} figures, ${scenes.length} scenes) -> book/offline-index.json`);
}
