# Events

> Maintain conference and workshop events in the browser: capture, list, filter, select, and preview as schema.org microdata — with the whole state persisted locally on every change.

## Vision

- Prove that a full-featured single-page application needs nothing beyond web standards and one templating library.

## Components

- `creation` and `overview` operate on the shared `events` slice; their reducers are chained — `creation` owns the list's content, `overview` owns selection and deletion.
- `overview` reads `filter`'s keyword read-only; never the reverse.
- `overview` loads the selected event into `creation`'s form cache (edit, preview).
- `preview` reads the event loaded into the form cache; it never mutates state.
- `inputs` is composed by `creation`'s form and reads the form cache read-only.
- Any BC's control layer may report to `status`; `status` calls no other BC.
- `localstorage` persists the entire state and preloads it on startup; only the store wiring calls it.
- `creation` may call the external validator backend; reachability failures are reported to `status`.

## System invariants

- S1 — The system shall restore its complete state from local persistence after a restart.
- S2 — The system shall remain fully usable without the validator backend.

## Ubiquitous language

- Event — a conference or workshop appearance; its name (`eventname`) is its identity across the application. Owned by `creation`, listed by `overview`.
- Form cache — the temporal, uncommitted event being entered or edited. Owned by `creation`; written by `overview` on edit.
- Selection — the checked state of overview rows; drives the bulk actions.

## Stack

- web-components · source root `events/src` · tag prefix `a-`
