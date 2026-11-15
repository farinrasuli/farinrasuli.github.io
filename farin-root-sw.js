/* Farin English: old-address redirect (scope '/').
   The Android app (TWA) starts at an old address of the app:
     - APK on the download links (Jul 27 build): /farin-english/farin-english-app.html
     - Play build (Aug 31):                      /farin-english/app/farin-english-app.html
   GitHub 301s both to http://thefeschool.com, then to https, then a stub page forwards to the real app:
   about 5 requests on 2 domains before the app shows, and offline it fails before the app's own service
   worker (farin-english-app/farin-sw.js) can serve its saved copy. This worker answers only those old app
   addresses, on the phone, with a redirect to the real app, so the app opens at once and offline.
   Everything else on this origin is untouched (no respondWith). Registered by the app page. */
const OLD_APP_RE = /^\/farin-english\/(?:farin-english-app\.html|app\/(?:farin-english-app\.html|index\.html)?)$/;
const NEW_APP = '/farin-english-app/farin-english-app.html';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin || !OLD_APP_RE.test(url.pathname)) return;
  e.respondWith(Response.redirect(new URL(NEW_APP + url.search, self.location.origin).href, 302));
});
