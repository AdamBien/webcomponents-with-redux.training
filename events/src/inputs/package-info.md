# inputs

> Reusable form input components shared across feature modules.

`DateInput` wraps the native `input type="date"` — the browser supplies the calendar
UI, keyboard access, and ISO 8601 values, replacing the former UI5 DatePicker
dependency (9 MB) with a web standard.

## Boundary

- `pick-date` — capture a date through the native date control

## Requirements

### R1: Date input

- R1.1 — inputs shall produce dates as ISO 8601 (`yyyy-mm-dd`) values. _(why: replaced the 9.2 MB UI5 DatePicker with the web-standard input)_
- R1.2 — While the form cache holds a value for its field, inputs shall display that value.
- R1.3 — Where the host marks the input disabled, inputs shall not accept input.

## Out of scope

- Dispatching the change to the state (the host module owns the change handling).
