// Service Worker: schnelle Wiederholungsbesuche und eine Offline-Ansicht.
// Bei Änderungen an Dateien die Versionsnummer erhöhen.
const VERSION = 'bibis-v2';
const CORE = [
  '/',
  '/manifest.webmanifest',
  '/assets/bibis-logo-240.webp',
  '/assets/bibis-logo-480.webp',
  '/assets/favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // Seiten: zuerst Netz (immer aktuell), offline aus dem Cache
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/')))
    );
    return;
  }

  // Next.js-RSC-Daten (Client-Navigation) wie Seiten behandeln: zuerst Netz
  if (req.headers.get('RSC') || new URL(req.url).pathname.endsWith('.txt')) return;

  // Bilder, Skripte, Schriften, Icons: zuerst Cache, dann Netz
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
      }
      return res;
    }))
  );
});
