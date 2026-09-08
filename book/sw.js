/* MAT Codex service worker: versioned cache with stale-while-revalidate. */
const CACHE = "mat-codex-v3";
const CORE = ["./", "./index.html", "./3d.html", "./styles.css", "./book.js", "./reader-core.mjs",
  "./math-config.js", "./manifest.json", "./search-index.json", "./visuals-index.json",
  "./elements.json", "./identities.json", "./periodic.json", "./offline-index.json",
  "./manifest.webmanifest", "./scenes/index.json",
  "./vendor/marked.mjs", "./vendor/tex-svg.js", "./vendor/three.module.js", "./vendor/OrbitControls.js",
  "./vendor/chart.min.js", "./data/elements-118.json", "./data/chart-datasets.json",
  "./styles/variables.css", "./styles/base.css", "./styles/layout.css", "./styles/toc.css",
  "./styles/sidebar-settings.css", "./styles/reader.css", "./styles/content.css",
  "./styles/visuals.css", "./styles/responsive.css", "./styles/print.css"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith("mat-") && k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  /* Stale-while-revalidate for HTML/JSON; cache-first for assets */
  const url = new URL(e.request.url);
  const isDynamic = /\.(html|json)$/.test(url.pathname) || url.pathname.endsWith("/");
  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(e.request).then((hit) => {
        const fetchPromise = fetch(e.request).then((res) => {
          if (res.ok) cache.put(e.request, res.clone());
          return res;
        }).catch(() => hit);
        return hit && !isDynamic ? hit : fetchPromise;
      })
    )
  );
});
