# Building web apps with Web Components, redux and lit-html

## The events application

A single-page application for maintaining conference and workshop events: create an
event through a form with native validation, list and filter all events, select rows
for editing or deletion, and preview the selected event as copy-pastable
[schema.org](https://schema.org) microdata. The entire state is persisted to
localStorage on every change. An optional Quarkus backend ([validator](./validator/))
verifies that entered links exist.

## Modernization

The events application was modernized along the lines of the [bce.design](https://github.com/AdamBien/bce.design) quickstarter. External libraries were pruned and replaced with web standards — the numbers are the argument:

| external library | replaced with (web standard) | before | after |
|---|---|---|---|
| Vaadin Router | [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API) + [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) + [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) in [router.js](events/src/router.js) | 2,924 lines | 55 lines |
| UI5 web components (DatePicker) | native `input type="date"` | 9.2 MB | 0 |
| Bulma | design tokens as CSS custom properties ([tokens.css](events/src/tokens.css)) + one plain stylesheet | 10,831 lines | 285 lines |
| Redux Toolkit | [reduction.js](events/src/reduction.js) — the used API (`configureStore`, `createAction`, `createReducer`) on [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) instead of Immer | 96 KB bundle | 77 lines |

Net effect in git: **44 files changed, 1,040 insertions, 14,640 deletions** — roughly 93% less code delivering the same application, plus the untracked 9.2 MB UI5 distribution removed from the payload. The only remaining runtime dependency is lit-html (7 KB).

Redux Toolkit was kept as an option, not deleted: application code imports `@reduxjs/toolkit` either way, and the import map in `events/src/index.html` selects the implementation — switching back is a one-line change. Dependencies resolve through [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap); the responsive layout uses container queries.

There is no build system. lit-html ships as a single, self-contained ES module since 3.x and is vendored in `events/src/lib/` directly from the npm registry:

```bash
./update-lit-html.sh 3.3.3
```

> [!TIP]
> LLMs love stable web standards: this project is easily maintained with AI coding agents using the [web-components skill](https://github.com/AdamBien/airails/tree/main/web/web-components) from [airails.dev](https://airails.dev) — the skill captures the architecture and naming rules (BCE modules, boundary facades, module-prefixed tags, standards-based routing) that this modernization follows.

## Architecture

The application follows the Boundary Control Entity (BCE) pattern: one folder per
business component, each split into `boundary/` (web components), `control/`
(actions and dispatchers), and `entity/` (reducers and state shape). Every module
documents its responsibility in a `package-info.md`:

- [creation](events/src/creation/package-info.md) — event form and commit-to-list logic
- [overview](events/src/overview/package-info.md) — event table, selection, bulk actions
- [filter](events/src/filter/package-info.md) — keyword filtering of the overview
- [status](events/src/status/package-info.md) — application-wide request status and errors
- [preview](events/src/preview/package-info.md) — schema.org microdata export
- [inputs](events/src/inputs/package-info.md) — reusable form inputs (native date picker)
- [localstorage](events/src/localstorage/package-info.md) — state persistence

### unidirectional data flow

State always travels the same cycle — the view never mutates state directly:

```mermaid
graph LR
    Boundary([Boundary<br/>web components]) -->|user event| Control([Control<br/>action creators])
    Control -->|dispatches action| Store([Store<br/>reduction.js or Redux Toolkit])
    Store -->|state, action| Entity([Entity<br/>reducers])
    Entity -->|next state| Store
    Store -->|notifies subscribers| Boundary
    Store -.->|persists state| Storage([localStorage])

    classDef boundary fill:#d5e8d4,stroke:#82b366,color:#000
    classDef control fill:#e1d5e7,stroke:#9673a6,color:#000
    classDef entity fill:#fff2cc,stroke:#d6b656,color:#000
    classDef bc fill:#dae8fc,stroke:#6c8ebf,color:#000
    classDef ext fill:#fff2cc,stroke:#d6b656,color:#000,stroke-dasharray:5 5
    class Boundary boundary
    class Control control
    class Entity entity
    class Store bc
    class Storage ext
```

## Installation

### frontend

To launch the web application, serve `events/src` with any static web server that falls back to `index.html` for unknown paths (required for deep links like `/preview`), e.g. with [zws](https://github.com/adamBien/zws) (zero dependencies web server, requires Java):

```bash
cd events/src
zws.sh --single
```

### (optional) backend

1. Install [quarkus](https://quarkus.io/get-started/)
2. `cd validator`
3. Perform: `./mvnw compile quarkus:dev`

# walk through

A walk through the application code:

[![events app walk through](https://i.ytimg.com/vi/NGJubEB_xgc/mqdefault.jpg)](https://www.youtube.com/embed/NGJubEB_xgc?rel=0)

# quickstarter

A quickstarter template was extracted from this application and is available from: https://github.com/adamBien/bce.design
