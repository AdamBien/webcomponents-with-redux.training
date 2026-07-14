/// # validator
///
/// > Checks whether a submitted link exists by probing the target and reporting the outcome.
///
/// ## Boundary
///
/// - `check-link` — probe the submitted link and report whether it exists
///
/// ## Requirements
///
/// ### R1: Probe the link
///
/// - R1.1 — When a link is submitted, the validator shall probe the target without fetching its content. _(why: existence is the question — the body is irrelevant)_
/// - R1.2 — When the target responds with status 404, the validator shall report the link as not existing together with that status. _(why: only a definite "not found" fails validation)_
/// - R1.3 — When the target responds with any status other than 404, the validator shall report the link as existing together with that status. _(why: a 403 or 500 still proves the host serves the link)_
///
/// ### R2: Handle unreachable targets
///
/// - R2.1 — If the target is unreachable, then the validator shall report the link as not existing with status 404. _(why: callers need no distinction between a network failure and a true 404; the probe is retried transparently before falling back)_
///
/// ### R3: Serve browser clients
///
/// - R3.1 — The validator shall answer requests from browser applications served from a different origin. _(why: the events frontend runs on its own origin)_
///
/// ## Entities
///
/// - Result — the probe outcome: the exists flag and the observed status.
///
/// ## Out of scope
///
/// - Triggering validation and interpreting the result (`creation` in the events frontend); content checks beyond existence.
package io.airhacks.validator;
