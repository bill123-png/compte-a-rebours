self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('timer-app').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});

/*
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== 'timer-app') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'Default Title', body: 'Default Body' };
  const options = {
    body: data.body,
    icon: '/icon.png',
    badge: '/badge.png'
  };

  e.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});*/