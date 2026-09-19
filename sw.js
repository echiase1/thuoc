        // Auto-generated Service Worker by HTML to PWA Converter
        const CACHE_NAME = 'pwa-cache-v841015';
        const FILES_TO_CACHE = [
            "./index.html",
"./offline.html",
"./manifest.json",
"./pwa-install.js",
"./icons/icon-192.png",
"./icons/icon-512.png"
        ];

        // Install Event - Pre-cache Static Files
        self.addEventListener('install', event => {
            self.skipWaiting();
            event.waitUntil(
                caches.open(CACHE_NAME).then(cache => {
                    console.log('[ServiceWorker] Pre-caching static assets');
                    return Promise.allSettled(
                        FILES_TO_CACHE.map(url => {
                            return cache.add(url).catch(err => console.warn('[ServiceWorker] Skip missing file:', url, err));
                        })
                    );
                })
            );
        });

        // Activate Event - Clean Up Old Caches
        self.addEventListener('activate', event => {
          event.waitUntil(
            caches.keys().then(keys => {
              return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
              );
            }).then(() => self.clients.claim())
          );
        });

        // Fetch Event - Cache First with Network Fallback & Offline Fallback
        self.addEventListener('fetch', event => {
          if (event.request.method !== 'GET') return;

          event.respondWith(
            caches.match(event.request)
              .then(response => {
                if (response) {
                  return response;
                }
                return fetch(event.request)
                  .then(networkResponse => {
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                      return networkResponse;
                    }
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                    return networkResponse;
                  });
              })
              .catch(() => {
                return caches.match('./offline.html') || caches.match('./index.html');
              })
          );
        });