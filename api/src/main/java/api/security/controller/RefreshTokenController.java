package api.security.controller;

import api.security.exceptions.JwtAuthenticationException;
import api.security.model.JwtUserDetails;
import api.security.model.LoginResponse;
import api.security.service.JwtTokenService;
import api.security.service.TokenExtractor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("auth/token")
public class RefreshTokenController {

    private JwtTokenService tokenService;
    private UserDetailsService userDetailsService;

    public RefreshTokenController(JwtTokenService tokenService, UserDetailsService userDetailsService) {
        this.tokenService = tokenService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping
    public LoginResponse refreshToken(@RequestBody Map<String, String> refreshTokenMap, HttpServletRequest request){

        String refreshToken = refreshTokenMap.get("refreshToken");
        tokenService.verifyToken(refreshToken);

        String accessToken = TokenExtractor.extract(request);
        String username = tokenService.getUsernameFromJWT(accessToken);
        JwtUserDetails userDetails = (JwtUserDetails) userDetailsService.loadUserByUsername(username);
        String dataBaseRefreshToken = userDetails.getRefreshToken();

        if(!dataBaseRefreshToken.equals(refreshToken)){
            throw new JwtAuthenticationException("Invalid refresh Token");
        }

        refreshToken = tokenService.generateRefreshToken(userDetails);
        accessToken = tokenService.generateAccessToken(userDetails);
        tokenService.updateRefreshToken(username, refreshToken);

        return new LoginResponse(accessToken, refreshToken);
    }
}
