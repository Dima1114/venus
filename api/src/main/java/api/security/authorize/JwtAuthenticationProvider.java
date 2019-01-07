package api.security.authorize;

import api.security.config.JwtSettings;
import api.security.model.JwtAuthenticationToken;
import api.security.model.JwtUserDetails;
import api.security.service.JwtTokenService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private JwtSettings jwtSettings;
    private JwtTokenService jwtTokenService;

    public JwtAuthenticationProvider(JwtSettings jwtSettings, JwtTokenService jwtTokenService) {
        this.jwtSettings = jwtSettings;
        this.jwtTokenService = jwtTokenService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;

        String token = jwtAuthenticationToken.getToken();
        jwtTokenService.verifyToken(token);

        JwtUserDetails userDetails = jwtTokenService.getUserDetailsFromJWT(token);

        return new JwtAuthenticationToken(userDetails, null, userDetails.getAuthorities(), token);
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return JwtAuthenticationToken.class.isAssignableFrom(aClass);
    }
}
