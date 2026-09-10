/* MAT Codex service worker: versioned offline cache. */
importScripts('./cache-version.js');
const CACHE = self.MAT_CACHE_NAME;

self.addEventListener("install", (e) => {
  e.waitUntil(
    fetch('./offline-index.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('Offline index unavailable');return r.json();})
      .then(index=>caches.open(CACHE).then(c=>c.addAll(index.app)))
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
  /* Network-first for documents and modules; cache-first for other assets */
  const url = new URL(e.request.url);
  if(url.origin!==self.location.origin)return;
  const isDynamic = /\.(html|json|md|yaml|mjs|js|css)$/.test(url.pathname) || url.pathname.endsWith("/");
  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(e.request).then((hit) => {
        // A stalled connection must not keep an already-saved chapter waiting.
        const fetchPromise = fetch(e.request,{signal:AbortSignal.timeout(hit ? 3000 : 20000)}).then((res) => {
          if (res.ok) e.waitUntil(cache.put(e.request, res.clone()));
          return res;
        }).catch(() => hit || new Response('This resource has not been saved for offline reading.',{status:503,headers:{'Content-Type':'text/plain'}}));
        e.waitUntil(fetchPromise.then(()=>{}));
        return hit && !isDynamic ? hit : fetchPromise;
      })
    )
  );
});
