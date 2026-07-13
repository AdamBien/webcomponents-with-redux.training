# creation

> Captures a new event through a form and commits it to the event list.

The facade (`Creation.js`, `a-creation`) is the routing target for `/` and doubles
as the home view: it composes the event form with the overview module's table.

Form input flows through a temporal cache (`form` in the state) on every change and
is only added to the list on save — `addOrReplace` treats the event name as the
identity, so saving an edited event replaces its list entry instead of duplicating it.
Link validation is asynchronous and delegated to the optional Quarkus backend
(`LinkValidatorControl`); a failed validation surfaces through the native form
validation via `setCustomValidity`, not a parallel error display.

## Boundary

- `change-input` — capture a single form-field change into the form cache
- `save-event` — validate and commit the form cache to the event list

## Requirements

### R1: Capture form input

- R1.1 — When a form field changes, creation shall record the value in the form cache without touching the event list. _(why: unsaved input must survive re-renders and navigation)_
- R1.2 — When the start date changes, creation shall default the end date to the start date. _(why: a one-day event needs one input)_
- R1.3 — When the online flag is set, creation shall pre-fill the location name with `online`; when the flag is cleared, creation shall clear the location name.
- R1.4 — When the link changes, creation shall trigger the asynchronous link validation.

### R2: Save an event

- R2.1 — When the form is saved with all fields present, creation shall add the event to the event list.
- R2.2 — If any field is missing, then creation shall reject the save through the native form validation. _(why: every field is mandatory — the microdata preview needs them all)_
- R2.3 — When an event is saved whose name already exists in the list, creation shall replace the existing entry instead of adding a duplicate. _(why: the event name is the identity — editing must not duplicate)_

### R3: Validate the link

- R3.1 — Where the validator is reachable, if it rejects the link, then creation shall reject the save and surface the rejection through the native form validation.
- R3.2 — If the validator is unreachable, then creation shall report the failure through status and allow saving. _(why: the validator backend is optional — the application must work without it)_
- R3.3 — While a validation request is in flight, creation shall disable the form and mark the save action busy.

## Entities

- Event

## Out of scope

- Listing, selecting and deleting events (`overview`); persistence (`localstorage`); microdata rendering (`preview`).
