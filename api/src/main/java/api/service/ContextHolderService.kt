package api.service

import api.entity.User
import api.security.model.JwtUserDetails
import api.security.model.getUser
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder

fun getUserFromContext(): User? {
    val auth = SecurityContextHolder.getContext()
            ?.authentication
            ?.takeIf { it is UsernamePasswordAuthenticationToken }
             ?: return null

    return auth.let { it as UsernamePasswordAuthenticationToken }
            .principal
            .let { it as JwtUserDetails }
            .getUser()
}