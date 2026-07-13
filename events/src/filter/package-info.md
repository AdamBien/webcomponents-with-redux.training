# filter

Holds the keyword the overview filters the event list by.

The filter is deliberately its own state slice and business component: the overview
consumes it read-only through `extractState`, so filtering stays a pure view concern —
the event list itself is never mutated by filtering.
