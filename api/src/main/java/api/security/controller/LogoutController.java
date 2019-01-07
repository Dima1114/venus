package api.security.controller;

import api.security.exceptions.JwtAuthenticationException;
import api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth/logout")
public class LogoutController {

    private final UserService userService;

    public LogoutController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity logout(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Integer user = userService.dropRefreshToken(username);
        if (user == 0) {
            throw new JwtAuthenticationException("logout error");
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
