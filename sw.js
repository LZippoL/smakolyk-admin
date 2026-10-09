self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await Promise.all((await caches.keys()).filter(name => name.startsWith('smakolyk-admin')).map(name => caches.delete(name)));
    await self.clients.claim();
    const clients = await self.clients.matchAll({ type: 'window' });
    await Promise.all(clients.map(client => client.navigate('https://admin.culinorium.com/')));
    await self.registration.unregister();
  })());
});
