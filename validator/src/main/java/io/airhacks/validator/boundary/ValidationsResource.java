package io.airhacks.validator.boundary;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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