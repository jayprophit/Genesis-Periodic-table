import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, resolve, sep, extname } from "node:path";

const root = join(import.meta.dirname, "..");
const port = +(process.argv[2] || 4173);
const mime = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".md": "text/markdown; charset=utf-8",
  ".yaml": "text/yaml; charset=utf-8", ".yml": "text/yaml; charset=utf-8",
  ".mjs": "text/javascript", ".webmanifest": "application/manifest+json",
  ".glb": "model/gltf-binary",
  ".svg": "image/svg+xml", ".png": "image/png", ".csv": "text/csv",
  ".txt":"text/plain; charset=utf-8", ".pdf":"application/pdf", ".webp":"image/webp", ".jpg":"image/jpeg",
};

createServer(async (req, res) => {
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  let urlPath;
  try{urlPath=decodeURIComponent(req.url.split('?')[0]);}catch{res.writeHead(400);res.end('Invalid URL encoding');return;}
  let file = resolve(root, urlPath === "/" ? "book/index.html" : '.'+urlPath);
  if (!file.startsWith(resolve(root)+sep) || urlPath.split(/[\\/]/).some(p=>p.startsWith('.')&&p!=='.'&&p!=='..')) { res.writeHead(403); res.end(); return; }
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream", "Cache-Control":"no-cache", "X-Content-Type-Options":"nosniff" });
    res.end(req.method==='HEAD'?undefined:body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("not found: " + urlPath);
  }
}).listen(port, '127.0.0.1', () => console.log(`MAT e-book preview: http://127.0.0.1:${port}/book/`));
