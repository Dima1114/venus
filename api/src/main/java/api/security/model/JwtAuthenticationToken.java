package api.security.model;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class JwtAuthenticationToken extends UsernamePasswordAuthenticationToken{

    private String token;

    public JwtAuthenticationToken(String token) {
        super(null, null);
        setAuthenticated(false);
        this.token = token;
    }

    public JwtAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities, String token) {
        super(principal, credentials, authorities);
        this.token = token;
//        setAuthenticated(true);
    }

    public String getToken() {
        return token;
    }

    public JwtAuthenticationToken setToken(String token) {
        this.token = token;
        return this;
    }
}
