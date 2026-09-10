// Chapter manifest. Reads docs + records, writes book/manifest.json.
import { join } from "node:path";
import { root, bookDir, titleOf, mdFiles, writeJson, rel } from "./lib.mjs";
import { sep } from "node:path";

export function buildManifest() {
  const chapters = [];
  function addSection(label, files) {
    if (!files.length) return;
    chapters.push({ section: label, items: [] });
    const sec = chapters[chapters.length - 1];
    for (const f of files) {
      const id = rel(f);
      const name = f.split(sep).pop().replace(/\.md$/, "");
      sec.items.push({ id, title: titleOf(f, name), path: "../" + id });
    }
  }
  const docs = (d) => mdFiles(join(root, "docs", d));
  addSection("Start here", [join(root, "README.md")]);
  addSection("Front matter", docs("00-front-matter"));
  addSection("Foundations", mdFiles(join(root, "docs", "01-foundations")));
  addSection("Data", mdFiles(join(root, "docs", "02-data")));
  addSection("Methodology", docs("03-methodology"));
  addSection("Visualization", docs("04-visualization"));
  addSection("Index", docs("05-index"));
  addSection("Governance", docs("06-governance"));
  addSection("Migration", docs("07-migration"));
  addSection("Back matter", docs("08-back-matter"));
  // Production guidance belongs with the existing Governance collection.
  const governance=chapters.find(s=>s.section==='Governance');
  for(const f of docs('09-production')){
    const id=rel(f);governance.items.push({id,title:titleOf(f,f.split(sep).pop()),path:'../'+id});
  }
  addSection("Material Atlas Table", mdFiles(join(root, "records")));
  writeJson("manifest.json", { title: "Materials Atlas Table Codex", chapters }, 2);
  const n = chapters.reduce((a, c) => a + c.items.length, 0);
  console.log(`manifest: ${chapters.length} sections, ${n} chapters -> book/manifest.json`);
  const flat = [];
  chapters.forEach((sec) => sec.items.forEach((it) => flat.push({ ...it, section: sec.section })));
  return { chapters, flat };
}
