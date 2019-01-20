package api.security.controller

import api.security.exceptions.JwtAuthenticationException
import api.security.model.JwtUserDetails
import api.security.model.LoginResponse
import api.security.service.JwtTokenService
import api.security.service.extract
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.web.bind.annotation.*

import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("auth/token")
class RefreshTokenController(private val tokenService: JwtTokenService, private val userDetailsService: UserDetailsService) {

    @PostMapping
    fun refreshToken(@RequestBody refreshTokenMap: Map<String, String>, request: HttpServletRequest): LoginResponse {

        var refreshToken = refreshTokenMap["refreshToken"] ?: ""
        tokenService.verifyToken(refreshToken)

        var accessToken = extract(request)
        val username = tokenService.getUsernameFromJWT(accessToken)
        val userDetails = userDetailsService.loadUserByUsername(username) as JwtUserDetails
        val dataBaseRefreshToken = userDetails.getRefreshToken()

        if (dataBaseRefreshToken != refreshToken) {
            throw JwtAuthenticationException("Invalid refresh Token")
        }

        refreshToken = tokenService.generateRefreshToken(userDetails)
        accessToken = tokenService.generateAccessToken(userDetails)
        tokenService.updateRefreshToken(username, refreshToken)

        return LoginResponse(accessToken, refreshToken)
    }
}
