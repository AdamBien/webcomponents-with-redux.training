package io.airhacks.validator.boundary;

import module java.base;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.faulttolerance.Fallback;
import org.eclipse.microprofile.faulttolerance.Retry;
import io.airhacks.validator.entity.Result;
import static jakarta.ws.rs.core.Response.Status.NOT_FOUND;
import static java.lang.System.Logger.Level.INFO;

@Path("/validations")
public class ValidationsResource {

    static final System.Logger LOGGER = System.getLogger(ValidationsResource.class.getName());

    @POST
    @Fallback(fallbackMethod = "notExists")
    @Retry(maxRetries = 3)
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Result check(String uri) {
        LOGGER.log(INFO, "validating {0}", uri);
        simulateLatency();
        try (var client = ClientBuilder.newClient()) {
            var status = client.target(uri).request().head().getStatus();
            return new Result(status != NOT_FOUND.getStatusCode(), status);
        }
    }

    public Result notExists(String uri) {
        return new Result(false, NOT_FOUND.getStatusCode());
    }

    void simulateLatency() {
        try {
            Thread.sleep(Duration.ofMillis(500));
        } catch (InterruptedException _) {
            Thread.currentThread().interrupt();
        }
    }
}
