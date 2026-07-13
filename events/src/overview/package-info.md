# overview

> Lists all events with filtering, selection, and bulk actions (edit, preview, delete, deselect).

The overview reducer operates on the same `events` slice as the creation reducer —
`store.js` chains them so selection and deletion act on the list the creation module
maintains. Row selection drives the action buttons: edit and preview require exactly
one selected row, delete and deselect any selection. Preview navigates programmatically
through the Navigation API (`navigation.navigate`), which the router intercepts like a
link click.

## Boundary

- `list-events` — display all events, filtered and chronologically sorted
- `select-event` — toggle one row's selection
- `edit-selected` — load the single selected event into the form for editing
- `preview-selected` — load the single selected event and navigate to its preview
- `deselect-all` — clear every selection
- `delete-selected` — remove all selected events

## Requirements

### R1: List events

- R1.1 — overview shall display all events sorted chronologically by start date.
- R1.2 — While a filter keyword is set, overview shall display only the events matching it.
- R1.3 — overview shall match the keyword case-insensitively against every textual field of an event.
- R1.4 — While the keyword is empty, overview shall display every event.

### R2: Select events

- R2.1 — When a row is toggled, overview shall record that event's selection state.
- R2.2 — While no event is selected, overview shall disable all bulk actions.
- R2.3 — While more than one event is selected, overview shall disable edit and preview. _(why: both act on exactly one event)_

### R3: Edit the selected event

- R3.1 — While exactly one event is selected, when edit is triggered, overview shall load the selected event into the form cache in edit mode.

### R4: Preview the selected event

- R4.1 — While exactly one event is selected, when preview is triggered, overview shall load the selected event and navigate to the preview view.

### R5: Delete and deselect

- R5.1 — When delete is triggered, overview shall remove every selected event from the list.
- R5.2 — When deselect-all is triggered, overview shall clear every selection.

## Entities

- Event, Selection

## Out of scope

- Capturing event data (`creation`); the keyword's state (`filter`); rendering the preview (`preview`).
