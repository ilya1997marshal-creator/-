const CACHE_NAME = 'ctai-base-v35';
const ASSETS = [
  './',
  './index.html',
  './styles.css?v=35',
  './app.js?v=35',
  './manifest.json',
  './data/instructions.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});