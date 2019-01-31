package api.security.controller

import api.security.exceptions.ErrorHandler
import api.security.exceptions.JwtAuthenticationException
import api.security.model.ErrorResponse
import api.security.model.JwtAuthenticationToken
import api.security.model.LoginRequest
import api.security.model.LoginResponse
import api.security.service.JwtTokenService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import javax.servlet.http.HttpServletResponse
import javax.validation.Valid
import java.time.LocalDateTime
import java.util.Date

@RestController
@RequestMapping("auth/login")
class LoginController(private val jwtTokenService: JwtTokenService,
                      private val authenticationManager: AuthenticationManager, private val errorHandler: ErrorHandler) {

    @PostMapping
    fun login(@Valid @RequestBody loginRequest: LoginRequest): ResponseEntity<*> {

        val authentication: Authentication
        try {
            authentication = authenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken(loginRequest.username, loginRequest.password)
            )
        } catch (ex: Exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ErrorResponse(HttpStatus.UNAUTHORIZED, ex.message))
        }

        SecurityContextHolder.getContext().authentication = authentication

        val accessToken = jwtTokenService.generateAccessToken(authentication.principal as UserDetails)
        val refreshToken = jwtTokenService.generateRefreshToken(authentication.principal as UserDetails)

        jwtTokenService.updateRefreshToken(loginRequest.username, refreshToken)

        return ResponseEntity.ok(
                LoginResponse(
                        accessToken, refreshToken,
                        loginRequest.username,
                        jwtTokenService.getExpTimeFromJWT(accessToken)))
    }
}
