package api.security.service;

import api.entity.Role;
import api.entity.User;
import api.repository.UserRepository;
import api.security.config.JwtSettings;
import api.security.exceptions.JwtAuthenticationException;
import api.security.model.JwtUserDetails;
import io.jsonwebtoken.*;
import org.apache.log4j.Logger;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JwtTokenServiceImpl implements JwtTokenService{

    private static final Logger logger = Logger.getLogger(JwtTokenService.class);

    private JwtSettings jwtSettings;
    private UserRepository userRepository;

    public JwtTokenServiceImpl(JwtSettings jwtSettings, UserRepository userRepository) {
        this.jwtSettings = jwtSettings;
        this.userRepository = userRepository;
    }

    @Override
    public void updateRefreshToken(String username, String refreshToken) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ArithmeticException("User not found"));

        user.setRefreshToken(refreshToken);
        userRepository.save(user);
    }

    public String generateAccessToken(UserDetails userDetails) {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtSettings.getJwtExpirationInMs());

        Claims claims = Jwts.claims();
        claims.put("roles", userDetails.getAuthorities().stream().map(GrantedAuthority::toString).collect(Collectors.toList()));
        claims.put("username", userDetails.getUsername());
        claims.put("userId", ((JwtUserDetails) userDetails).getId());

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSettings.getJwtSecret())
                .compact();
    }

    public String generateRefreshToken(UserDetails userDetails) {

        String uid = UUID.randomUUID().toString();

        Claims claims = Jwts.claims();
        claims.put("uid", uid);
        claims.put("userId", ((JwtUserDetails) userDetails).getId());

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtSettings.getJwtRefreshExpirationInMs());

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSettings.getJwtSecret())
                .compact();
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSettings.getJwtSecret())
                .parseClaimsJws(token)
                .getBody();

        return claims.get("username", String.class);
    }

    @Override
    public long getExpTimeFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSettings.getJwtSecret())
                .parseClaimsJws(token)
                .getBody();
        return claims.getExpiration().getTime();
    }

    @Override
    @SuppressWarnings("unchecked")
    public Set<Role> getUserRolesFromJWT(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSettings.getJwtSecret())
                .parseClaimsJws(token)
                .getBody();

        return (Set<Role>) claims.get("roles", List.class)
                .stream()
                .map(role -> Role.valueOf((String) role))
                .collect(Collectors.toSet());
    }

    @Override
    public JwtUserDetails getUserDetailsFromJWT(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSettings.getJwtSecret())
                .parseClaimsJws(token)
                .getBody();

        JwtUserDetails userDetails = new JwtUserDetails();
        return userDetails
                .setUsername(claims.get("username", String.class))
                .setId((long)claims.get("userId", Integer.class))
                .setAuthorities(getUserRolesFromJWT(token));
    }

    public boolean verifyToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSettings.getJwtSecret()).parseClaimsJws(authToken);
        } catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
            logger.error("Invalid JWT signature");
            throw new JwtAuthenticationException(ex.getMessage());
        }
        return true;
    }


}
