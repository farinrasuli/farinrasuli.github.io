# farinrasuli.github.io

**This site must NEVER get a custom domain (no CNAME file, nothing in Settings → Pages → Custom domain).**
The Farin English app lives on this origin (`farinrasuli.github.io/farin-english-app/`): learners' saved progress is tied to it, the Android app's Digital Asset Links (`.well-known/assetlinks.json`) are served from here, and `farin-root-sw.js` (the offline redirect for the Android app's old start URL) depends on this origin staying put. See the HARD RULE in `Claude/entities.md`.

`farin-root-sw.js` is a pure navigation redirect: `/farin-english/farin-english-app.html` (start URL of the APK on the download links, Jul 27 build) and `/farin-english/app/`, `/farin-english/app/farin-english-app.html` (Play build, Aug 31) → `/farin-english-app/farin-english-app.html`. No caching, nothing else touched. Without it every launch goes GitHub 301 → http://thefeschool.com → https → stub page → app (about 5 requests, 2 domains) and fails offline. Test: `node Claude/qa/launch-redirect-check.mjs "english app/app" <new sw> [<old sw>]`. Retire it only once no installed Android app uses an old start URL.
