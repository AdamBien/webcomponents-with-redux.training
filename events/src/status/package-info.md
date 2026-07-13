# status

> Application-wide request status and error reporting.

Any control layer can report `requestStarted` / `requestCompleted` / `errorHappened`;
the status component in the page header renders the outcome, and form controls read
the loading flag to disable themselves during in-flight requests. Keeping this
cross-cutting concern in one slice spares every feature module its own spinner state.

## Boundary

- `report-request-started` — mark a described request as in flight
- `report-request-completed` — mark the request as finished
- `report-error` — record and display a user-facing error message
- `clear-message` — dismiss the displayed message

## Requirements

### R1: Track requests

- R1.1 — When a request starts, status shall record it as in flight together with its description.
- R1.2 — When a request completes, status shall clear the in-flight state.
- R1.3 — While a request is in flight, status shall expose the loading state to every component. _(why: form controls disable themselves during requests — one slice spares each module its own spinner state)_

### R2: Report errors

- R2.1 — When an error is reported, status shall display the user-facing message.
- R2.2 — When the message is cleared, status shall remove the message and the recorded error.
- R2.3 — While no message is present, status shall hide the clear action.

## Out of scope

- Interpreting, retrying or recovering failed requests (callers own that).
