// sw.js - Cache strategy
const CACHE_NAME = "bp-76th-v1";
const urlsToCache = [
  "/",
  "/css/styles.min.css",
  "/js/main.min.js",
  "/assets/logo/logo76year.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
