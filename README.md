# farinrasuli.github.io

**This site must NEVER get a custom domain (no CNAME file, nothing in Settings → Pages → Custom domain).**
The Farin English app lives on this origin (`farinrasuli.github.io/farin-english-app/`): learners' saved progress is tied to it, the Android app's Digital Asset Links (`.well-known/assetlinks.json`) are served from here, and `farin-root-sw.js` (the offline redirect for the Android app's old start URL) depends on this origin staying put. See the HARD RULE in `Claude/entities.md`.

`farin-root-sw.js` is a pure navigation redirect: `/farin-english/app/*` → `/farin-english-app/farin-english-app.html`. No caching, nothing else touched. Retire it once the Android app's start URL is the direct one.
