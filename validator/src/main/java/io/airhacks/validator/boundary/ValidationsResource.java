package io.airhacks.validator.boundary;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.WebTarget;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import org.eclipse.microprofile.faulttolerance.Fallback;
import org.eclipse.microprofile.faulttolerance.Retry;

import io.airhacks.validator.entity.Result;

@Path("/validations")
public class ValidationsResource {

    @POST
    @Fallback(fallbackMethod = "notExists")
    @Retry(maxRetries = 3)
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Result check(String uri) {
        System.out.println("# " + uri);
        try {
			Thread.sleep(500);
		} catch (InterruptedException e) {}
        Client client = ClientBuilder.newClient();
        WebTarget target = client.target(uri);
        Response response = target.request().head();
        int status = response.getStatus();
        if (status == 404) {
            return new Result(false, status);
        }
        return new Result(true, status);
    }
    
    public Result notExists(String uri) {
        return new Result(false, 404);
    }
}