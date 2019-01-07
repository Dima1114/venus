package api.security.service;

import api.entity.Role;
import api.security.model.JwtUserDetails;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Set;

public interface JwtTokenService {

    void updateRefreshToken(String username, String refreshToken);
    String generateAccessToken(UserDetails userDetails);
    String generateRefreshToken(UserDetails userDetails);
    String getUsernameFromJWT(String token);
    long getExpTimeFromJWT(String token);

    Set<Role> getUserRolesFromJWT(String token);

    JwtUserDetails getUserDetailsFromJWT(String token);

    boolean verifyToken(String authToken);
}
