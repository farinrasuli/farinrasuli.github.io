/* Farin English: old-address redirect (scope '/').
   The Android app (TWA) opens https://farinrasuli.github.io/farin-english/app/farin-english-app.html,
   which GitHub now 301s to thefeschool.com, which then redirects back to the real app. Offline that
   chain fails before the app's own service worker (farin-english-app/farin-sw.js) can serve its saved
   copy. This worker answers only that old app address, on the phone, with a redirect to the real app,
   so the app opens offline and online skips two hops. Everything else on this origin is untouched.
   Registered by the app page (farin-english-app.html). */
const OLD_APP_RE = /^\/farin-english\/app\/(?:farin-english-app\.html)?$/;
const NEW_APP = '/farin-english-app/farin-english-app.html';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin || !OLD_APP_RE.test(url.pathname)) return;
  e.respondWith(Response.redirect(new URL(NEW_APP + url.search, self.location.origin).href, 302));
});
