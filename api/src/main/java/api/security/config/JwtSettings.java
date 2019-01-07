package api.security.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtSettings {

    @Value("${jwt.security.secret}")
    private String jwtSecret;
    @Value("${jwt.access.expirationInMs}")
    private long jwtExpirationInMs;
    @Value("${jwt.refresh.expirationInMs}")
    private long jwtRefreshExpirationInMs;

    public String getJwtSecret() {
        return jwtSecret;
    }

    public long getJwtExpirationInMs() {
        return jwtExpirationInMs;
    }

    public long getJwtRefreshExpirationInMs() {
        return jwtRefreshExpirationInMs;
    }
}
