const CACHE_NAME = "supply-flow-seel-static-v2";
const APP_SCOPE = new URL(self.registration.scope);
const STATIC_ASSETS = [
  new URL("manifest.webmanifest", APP_SCOPE).href,
  new URL("logo-seel.png", APP_SCOPE).href,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  if (event.request.method !== "GET") return;
  if (requestUrl.hostname.includes("supabase.co")) return;
  if (requestUrl.pathname.includes("/auth/")) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(
          "<!doctype html><html><body style=\"font-family:system-ui;padding:24px\"><h1>Sem conexao</h1><p>Os dados do Supply Flow exigem conexao segura.</p></body></html>",
          { headers: { "Content-Type": "text/html;charset=UTF-8" } }
        )
      )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => {
        throw new Error("Offline");
      });
    })
  );
});
