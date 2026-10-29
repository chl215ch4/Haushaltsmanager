const CACHE_NAME = 'haushalt-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './mobile.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon.svg'
];

// Install: Cache essential core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Remove outdated caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-first for dynamic / live-sync, cache-fallback for offline
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Always bypass cache for Google Sheets sync or external APIs
  if (url.hostname.includes('google') || url.hostname.includes('script.google.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // For app assets: try network first with quick fallback to cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone and update cache if valid
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline fallback
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});
