const CACHE_NAME = 'cantina-cache-v1';
const ASSETS = [
  '/cantina-app/',
  '/cantina-app/index.html',
  '/cantina-app/manifest.webmanifest',
  '/cantina-app/sw.js',
  '/cantina-app/icons/icon-192.png',
  '/cantina-app/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

