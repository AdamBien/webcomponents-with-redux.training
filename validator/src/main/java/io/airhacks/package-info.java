/// # airhacks backend
///
/// ## Charter
///
/// Backend services for the events application — verify that entered links exist.
///
/// ## Components
///
/// - `validator` is called by the events frontend (`creation` BC); it calls no other component.
///
/// ## Stack
///
/// - microprofile-server (Quarkus) · package base `io.airhacks` · project `validator/`
package io.airhacks;
