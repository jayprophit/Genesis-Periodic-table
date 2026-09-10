// Offline index: every local resource for a complete book save.
// Writes book/offline-index.json. External services excluded.
import { writeJson, readJson } from "./lib.mjs";
import {readdirSync,readFileSync,statSync,existsSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {Marked} from '../vendor/marked.mjs';
const root=join(import.meta.dirname,'../..');
function filesAt(dir,test){
  if(!existsSync(join(root,dir)))return [];
  return readdirSync(join(root,dir)).flatMap(name=>{
    const path=dir+'/'+name;
    return statSync(join(root,path)).isDirectory()?filesAt(path,test):test(path)?[path]:[];
  });
}

export function buildOfflineIndex(manifest) {
  const chapters = [];
  manifest.chapters.forEach((sec) => sec.items.forEach((it) => chapters.push(it.path)));
  const vidx = readJson("visuals-index.json", { visuals: [] });
  const figures = [];
  for (const v of vidx.visuals || []) for (const it of v.items || [])
    if (it.found && /\.(svg|png|jpe?g|webp)$/i.test(it.file)) figures.push(`../${v.dir}/${it.path}${it.file}`);
  let scenes = [];
  const si = readJson("scenes/index.json", { scenes: [] });
  scenes = (si.scenes || []).map((s) => `./scenes/${s.file}`);
  const cssModules = [
    "./styles/variables.css", "./styles/base.css", "./styles/layout.css", "./styles/toc.css",
    "./styles/sidebar-settings.css", "./styles/reader.css", "./styles/content.css",
    "./styles/visuals.css", "./styles/responsive.css", "./styles/print.css",
    "./styles/reading-modes.css", "./styles/codex-panels.css", "./styles/periodic-extra.css",
    "./styles/reader-overrides.css", "./styles/popup-sections.css",
    "./styles/onboarding.css"
  ];
  const dataFiles = [
    "./data/elements-118.json", "./data/chart-datasets.json",
    "./data/russell-periodic.json", "./data/combined-periodic.json",
    "./data/publication/metadata.json"
  ];
  const app = ["./", "./index.html", "./3d.html", "./styles.css", "./book.js", "./reader-core.mjs",
    "./math-config.js", "./manifest.json", "./search-index.json", "./visuals-index.json",
    "./elements.json", "./identities.json", "./periodic.json", "./offline-index.json",
    "./manifest.webmanifest", "./scenes/index.json",
    "./vendor/marked.mjs", "./vendor/tex-svg.js", "./vendor/three.module.js", "./vendor/OrbitControls.js",
    "./vendor/chart.min.js",
    "./reference-visuals/walter russel.webp",
    "./reference-visuals/angular form walter russel.png",
    "./reference-visuals/angular form walter russel2.png",
    "./reference-visuals/angular form walter russel3.png",
    "./reference-visuals/angular form walter russel4.png",
    ...cssModules, ...dataFiles];
  app.push(...filesAt('book/modules',p=>/\.(mjs|js)$/.test(p)).map(p=>'./'+p.slice(5)));
  app.push('./icon.svg');
  const data=filesAt('records',p=>/\.(yaml|yml|csv|json|glb|svg|png|jpe?g|webp)$/.test(p)).map(p=>'../'+p);
  data.push('../data/catalog/sources/nubase_4.mas20.txt','../data/catalog/nuclear-evaluation-index.json','../data/intake/mat-42-52.json','../data/intake/mat-42-52-claims.json');
  data.push('../data/registries/sources.yaml','../dist/MAT-ebook.html');
  // Include actual local destinations such as archived source transcripts and
  // schema files. Citation downloads must keep working in the saved edition.
  const parser=new Marked();
  for(const chapter of chapters){
    const source=readFileSync(join(root,'book',chapter),'utf8');
    parser.walkTokens(parser.lexer(source),token=>{
      if(!['link','image'].includes(token.type))return;
      const url=new URL(token.href,new URL(chapter,'https://mat.invalid/book/'));
      if(url.origin!=='https://mat.invalid')return;
      const path=decodeURIComponent(url.pathname.slice(1)),file=join(root,path);
      if(existsSync(file)&&statSync(file).isFile())data.push('../'+path);
    });
  }
  const all = [...new Set([...app, ...chapters, ...figures, ...scenes, ...data])].sort();
  const hasher=createHash('sha256');
  for(const url of all.filter(p=>p!=='./offline-index.json')){
    const file=url==='./'?'book/index.html':'book/'+decodeURIComponent(url);
    if(!existsSync(join(root,file)))throw new Error('Offline resource missing: '+url);
    let bytes=readFileSync(join(root,file));
    // Git canonicalizes text to LF. Retained source snapshots remain byte-exact.
    if(/\.(?:m?js|css|html|json|ya?ml|md|svg)$/.test(file))bytes=Buffer.from(bytes.toString('utf8').replace(/\r\n/g,'\n'));
    hasher.update(url).update(bytes);
  }
  const cacheName='mat-codex-'+hasher.digest('hex').slice(0,16);
  writeFileSync(join(root,'book/cache-version.js'),`self.MAT_CACHE_NAME = ${JSON.stringify(cacheName)};\n`);
  all.push('./cache-version.js');
  writeJson("offline-index.json", { cacheName, app, chapters, figures, scenes, data, all }, 1);
  console.log(`offline: ${all.length} resources (${chapters.length} chapters, ${figures.length} figures, ${scenes.length} scenes) -> book/offline-index.json`);
}
