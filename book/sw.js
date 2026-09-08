/* MAT e-book service worker: offline-first for local content. */
const CACHE = "mat-ebook-v2";
const CORE = ["./", "./index.html", "./3d.html", "./styles.css", "./book.js", "./reader-core.mjs",
  "./math-config.js", "./manifest.json", "./search-index.json", "./visuals-index.json",
  "./elements.json", "./identities.json", "./manifest.webmanifest", "./scenes/index.json",
  "./vendor/marked.mjs", "./vendor/tex-svg.js", "./vendor/three.module.js", "./vendor/OrbitControls.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(
      (hit) =>
        hit ||
        fetch(e.request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
    )
  );
});
