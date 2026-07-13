# preview

> Renders the selected event as schema.org microdata ready to copy into a blog post.

Uses Shadow DOM deliberately — the one component in the application that does — so the
copied markup and its external stylesheet stay isolated from the page styles, and
`copyIntoClipboard` can serialize exactly what is rendered.

## Boundary

- `show-preview` — render the loaded event as schema.org microdata
- `copy-markup` — copy the rendered microdata to the clipboard

## Requirements

### R1: Render microdata

- R1.1 — preview shall render the loaded event as a schema.org `Event` including name, description, location, start and end date, and link.
- R1.2 — preview shall isolate the rendered markup and its styles from the page styles. _(why: the copied markup must match a blog post's context, not this application's)_

### R2: Copy the markup

- R2.1 — When copy is triggered and clipboard access is permitted, preview shall copy exactly the microdata markup — no styling, no controls.
- R2.2 — If clipboard access is denied, then preview shall leave the clipboard untouched.

## Entities

- Event

## Out of scope

- Choosing the event (`overview`); editing event data (`creation`).
