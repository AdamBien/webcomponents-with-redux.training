# preview

Renders the selected event as schema.org microdata ready to copy into a blog post.

Uses Shadow DOM deliberately — the one component in the application that does — so the
copied markup and its external stylesheet stay isolated from the page styles, and
`copyIntoClipboard` can serialize exactly what is rendered.
