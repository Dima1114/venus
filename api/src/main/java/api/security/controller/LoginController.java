package api.security.controller;

import api.security.exceptions.ErrorHandler;
import api.security.exceptions.JwtAuthenticationException;
import api.security.model.ErrorResponse;
import api.security.model.JwtAuthenticationToken;
import api.security.model.LoginRequest;
import api.security.model.LoginResponse;
import api.security.service.JwtTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.Date;

@RestController
@RequestMapping("auth/login")
public class LoginController {

    private JwtTokenService jwtTokenService;
    private AuthenticationManager authenticationManager;
    private ErrorHandler errorHandler;

    public LoginController(JwtTokenService jwtTokenService,
                           AuthenticationManager authenticationManager, ErrorHandler errorHandler) {
        this.jwtTokenService = jwtTokenService;
        this.authenticationManager = authenticationManager;
        this.errorHandler = errorHandler;
    }

    @PostMapping
    public ResponseEntity login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response){

        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(HttpStatus.UNAUTHORIZED, ex.getMessage(), new Date()));
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtTokenService.generateAccessToken((UserDetails) authentication.getPrincipal());
        String refreshToken = jwtTokenService.generateRefreshToken((UserDetails) authentication.getPrincipal());

        jwtTokenService.updateRefreshToken(loginRequest.getUsername(), refreshToken);

        return ResponseEntity.ok(
                new LoginResponse(
                        accessToken, refreshToken,
                        loginRequest.getUsername(),
                        jwtTokenService.getExpTimeFromJWT(accessToken)));
    }
}
