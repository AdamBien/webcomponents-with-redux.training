# overview

Lists all events with filtering, selection, and bulk actions (edit, preview, delete, deselect).

The overview reducer operates on the same `events` slice as the creation reducer —
`store.js` chains them so selection and deletion act on the list the creation module
maintains. Row selection drives the action buttons: edit and preview require exactly
one selected row, delete and deselect any selection. Preview navigates programmatically
through the Navigation API (`navigation.navigate`), which the router intercepts like a
link click.
