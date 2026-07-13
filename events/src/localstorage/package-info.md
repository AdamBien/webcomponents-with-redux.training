# localstorage

> Persists the entire application state to localStorage on every store update and preloads it on startup.

The storage key derives from `appName` in `app.config.js`. Save and load never throw —
persistence failures are logged, not fatal; the application works without storage.

## Boundary

- `save-state` — persist the entire application state
- `load-state` — return the previously persisted state, if any

## Requirements

### R1: Persist

- R1.1 — When the application state changes, localstorage shall persist the entire state.
- R1.2 — localstorage shall derive the storage key from the application name.
- R1.3 — If persisting fails, then localstorage shall log the failure and continue. _(why: the application must work without storage)_

### R2: Preload

- R2.1 — When the application starts, localstorage shall provide the previously persisted state.
- R2.2 — If no persisted state exists or loading fails, then localstorage shall report no state, so the application starts with defaults.

## Out of scope

- Selecting what to persist (always the whole state); versioning or migrating stored state.
