import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { join, normalize, extname } from "node:path";

const root = join(import.meta.dirname, "..");
const port = +(process.argv[2] || 4173);
const mime = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".md": "text/markdown; charset=utf-8",
  ".yaml": "text/yaml; charset=utf-8", ".yml": "text/yaml; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".csv": "text/csv",
};

createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let file = normalize(join(root, urlPath === "/" ? "book/index.html" : urlPath));
  if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
  try {
    if (statSync(file).isDirectory()) file = join(file, "index.html");
    const body = readFileSync(file);
    res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("not found: " + urlPath);
  }
}).listen(port, () => console.log(`MAT e-book preview: http://localhost:${port}/book/`));
