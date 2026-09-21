const CACHE_PREFIX = 'gapura-smart-';
const CACHE_NAME = CACHE_PREFIX + 'build-36cc96041040';
const APP_FILES = ['./', './index.html', './styles.css', './app.js', './sop-data.js', './manifest.json', './logo.png', './native.js'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
});
self.addEventListener('message', event => {
  if (event.data?.type === 'ACTIVATE_UPDATE') event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(names => Promise.all(names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME).map(name => caches.delete(name)))).then(() => self.clients.claim()));
});
// Versioned app shell: keep scripts and SOP data from the same release together.
// A new worker activates after existing app tabs close; bump CACHE_NAME on release.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  const knownFile = APP_FILES.some(path => new URL(path, self.registration.scope).pathname === url.pathname);
  if (!knownFile && event.request.mode !== 'navigate') return;
  event.respondWith(caches.open(CACHE_NAME).then(async cache => {
    const cached = await cache.match(event.request, { ignoreSearch: true });
    if (cached) return cached;
    try { return await fetch(event.request); }
    catch (error) {
      if (event.request.mode === 'navigate') return await cache.match('./index.html');
      throw error;
    }
  }));
});
