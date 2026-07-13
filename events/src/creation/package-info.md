# creation

Captures a new event through a form and commits it to the event list.

Form input flows through a temporal cache (`form` in the state) on every change and
is only added to the list on save — `addOrReplace` treats the event name as the
identity, so saving an edited event replaces its list entry instead of duplicating it.
Link validation is asynchronous and delegated to the optional Quarkus backend
(`LinkValidatorControl`); a failed validation surfaces through the native form
validation via `setCustomValidity`, not a parallel error display.
