package api.security.login

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

class JwtLoginProvider : AuthenticationProvider {

    private var userDetailsService: UserDetailsService? = null
    private var encoder: BCryptPasswordEncoder? = null

    @Throws(AuthenticationException::class)
    override fun authenticate(authentication: Authentication): Authentication {
        val username = authentication.principal as String
        val password = authentication.credentials as String

        val userDetails = userDetailsService!!.loadUserByUsername(username)

        if (!encoder!!.matches(password, userDetails.password)) {
            throw BadCredentialsException("Password is not valid")
        }

        if (!userDetails.isEnabled) {
            throw BadCredentialsException("User is banned. You can`t login")
        }

        return UsernamePasswordAuthenticationToken(userDetails, password, userDetails.authorities)
    }

    override fun supports(authentication: Class<*>): Boolean {
        return UsernamePasswordAuthenticationToken::class.java == authentication
    }

    @Autowired
    fun setUserDetailsService(userDetailsService: UserDetailsService): JwtLoginProvider {
        this.userDetailsService = userDetailsService
        return this
    }

    @Autowired
    fun setEncoder(encoder: BCryptPasswordEncoder): JwtLoginProvider {
        this.encoder = encoder
        return this
    }
}
