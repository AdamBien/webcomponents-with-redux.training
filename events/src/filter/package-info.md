# filter

> Holds the keyword the overview filters the event list by.

The filter is deliberately its own state slice and business component: the overview
consumes it read-only through `extractState`, so filtering stays a pure view concern —
the event list itself is never mutated by filtering.

## Boundary

- `change-filter` — record the keyword as it is typed

## Requirements

### R1: Hold the keyword

- R1.1 — When the keyword input changes, filter shall record the keyword.
- R1.2 — filter shall start with an empty keyword. _(why: an empty keyword shows the full list — the default view)_

## Out of scope

- Applying the keyword to the event list (`overview` owns the matching).
