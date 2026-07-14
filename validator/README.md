# validator

Quarkus microservice that checks whether a URI is reachable by issuing an HTTP `HEAD` request and returning the result as JSON. Unreachable targets are handled with MicroProfile Fault Tolerance (`@Retry`, `@Fallback`). CORS is enabled, so the service is directly accessible from the web components frontend in this repository.

## Prerequisites

Java 25+

## Build and Run

Dev mode with live reload:

```
./mvnw quarkus:dev
```

Package and run:

```
./mvnw package
java -jar target/quarkus-app/quarkus-run.jar
```

## Native Executable

```
./mvnw package -Dnative
```

Or without a local GraalVM installation:

```
./mvnw package -Dnative -Dquarkus.native.container-build=true
```

Run the binary: `./target/validator-2026-runner`
