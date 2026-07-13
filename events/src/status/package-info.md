# status

Application-wide request status and error reporting.

Any control layer can report `requestStarted` / `requestCompleted` / `errorHappened`;
the status component in the page header renders the outcome, and form controls read
the loading flag to disable themselves during in-flight requests. Keeping this
cross-cutting concern in one slice spares every feature module its own spinner state.
