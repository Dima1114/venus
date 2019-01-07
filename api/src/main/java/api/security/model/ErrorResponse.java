package api.security.model;

import org.springframework.http.HttpStatus;

import java.util.Date;

public class ErrorResponse {

    private final HttpStatus status;
    private final String message;
    private final Date timestamp;

    public ErrorResponse(HttpStatus status, String message, Date timestamp) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public Date getTimestamp() {
        return timestamp;
    }
}
