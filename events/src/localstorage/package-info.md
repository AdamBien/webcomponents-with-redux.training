# localstorage

Persists the entire application state to localStorage on every store update and
preloads it on startup.

The storage key derives from `appName` in `app.config.js`. Save and load never throw —
persistence failures are logged, not fatal; the application works without storage.
