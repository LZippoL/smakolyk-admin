// No offline admin shell: every request must pass through Cloudflare Access.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.filter(name => name.startsWith('smakolyk-admin')).map(name => caches.delete(name))
    )).then(() => self.clients.claim())
  );
});
