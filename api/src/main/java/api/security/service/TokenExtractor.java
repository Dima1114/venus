package api.security.service;

import api.security.config.JwtSecurityConfig;
import api.security.exceptions.JwtAuthenticationException;

import javax.servlet.http.HttpServletRequest;

public class TokenExtractor {

    private static final String PREFIX = "Bearer ";

    public static String extract(HttpServletRequest request){

        String header = request.getHeader(JwtSecurityConfig.TOKEN_HEADER);

        if (header == null || !header.startsWith(PREFIX)) {
            throw new JwtAuthenticationException("Token is missing");
        }

        return header.substring(7);
    }
}
