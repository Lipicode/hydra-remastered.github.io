importScripts('/static/uv/uv.bundle.js');
importScripts('/static/uv/uv.config.js');
importScripts('/static/uv/uv.sw.js');
importScripts('https://arc.io/arc-sw-core.js');

const sw = new UVServiceWorker();
.
self.addEventListener('install', (event) => {
console.log('[Service Worker] Installing...');
self.skipWaiting();
});
self.addEventListener('activate', (event) => {
console.log('[Service Worker] Activating...');
event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (event) => {
event.respondWith(
(async () => {
try {
const response = await sw.fetch(event);
return response;
} catch (error) {
console.error('[Service Worker] Fetch error:', error);
return new Response('Service Unavailable', {
status: 503,
statusText: 'Service Unavailable'
        });
      }
    })()
  );
});
