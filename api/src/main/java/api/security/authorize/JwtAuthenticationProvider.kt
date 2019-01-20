package api.security.authorize

import api.security.config.JwtSettings
import api.security.model.JwtAuthenticationToken
import api.security.model.JwtUserDetails
import api.security.service.JwtTokenService
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.stereotype.Component

@Component
class JwtAuthenticationProvider(private val jwtSettings: JwtSettings,
                                private val jwtTokenService: JwtTokenService) : AuthenticationProvider {

    @Throws(AuthenticationException::class)
    override fun authenticate(authentication: Authentication): Authentication {
        val jwtAuthenticationToken = authentication as JwtAuthenticationToken

        val token = jwtAuthenticationToken.token
        jwtTokenService.verifyToken(token!!)

        val userDetails = jwtTokenService.getUserDetailsFromJWT(token)

        return JwtAuthenticationToken(userDetails, null, userDetails.authorities, token)
    }

    override fun supports(aClass: Class<*>): Boolean {
        return JwtAuthenticationToken::class.java.isAssignableFrom(aClass)
    }
}
