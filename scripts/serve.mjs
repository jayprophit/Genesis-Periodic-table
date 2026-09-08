import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const ROOT = 'C:/Users/jpowe/Desktop/Materials-Atlas-Table-Codex---MAT/book';
const MIME = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.glb':'model/gltf-binary'};
http.createServer((req, res) => {
  const fp = path.join(ROOT, req.url === '/' ? '/index.html' : req.url.split('?')[0]);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type': MIME[path.extname(fp)] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(8080, () => console.log('Serving on http://localhost:8080'));
