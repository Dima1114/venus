package api.security.service.impl

import api.entity.Role
import api.entity.User
import api.repository.UserRepository
import api.security.config.JwtSettings
import api.security.exceptions.JwtAuthenticationException
import api.security.model.JwtUserDetails
import api.security.service.JwtTokenService
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import mu.KLogging
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtTokenServiceImpl(private val jwtSettings: JwtSettings, private val userRepository: UserRepository) : JwtTokenService {

    companion object : KLogging()

    //TODO create query to update only refresh token field and skip validation
    override fun updateRefreshToken(username: String, refreshToken: String) {
        val user: User = userRepository.findByUsername(username)
                .orElseThrow { JwtAuthenticationException("User not found") }

        user.refreshToken = refreshToken
        userRepository.save(user)
    }

    override fun generateAccessToken(userDetails: UserDetails): String {

        val expirationDate = Date( Date().time + jwtSettings.jwtExpirationInMs)

        val claims = Jwts.claims()
        claims["roles"] = userDetails.authorities.map{ it.toString() }
        claims["username"] = userDetails.username
        claims["userId"] = (userDetails as JwtUserDetails).getId()

        return Jwts.builder()
                .setSubject(userDetails.username)
                .setClaims(claims)
                .setIssuedAt(Date())
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, jwtSettings.jwtSecret)
                .compact()
    }

    override fun generateRefreshToken(userDetails: UserDetails): String {

        val uid = UUID.randomUUID().toString()

        val claims = Jwts.claims()
        claims["uid"] = uid
        claims["userId"] = (userDetails as JwtUserDetails).getId()
        claims["username"] = userDetails.username

        val expirationDate = Date(Date().time + jwtSettings.jwtRefreshExpirationInMs)

        return Jwts.builder()
                .setSubject(userDetails.username)
                .setClaims(claims)
                .setIssuedAt(Date())
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, jwtSettings.jwtSecret)
                .compact()
    }

    override fun getUsernameFromJWT(token: String): String {
        val claims = Jwts.parser()
                .setSigningKey(jwtSettings.jwtSecret)
                .parseClaimsJws(token)
                .body

        return claims.get("username", String::class.java)
    }

    override fun getExpTimeFromJWT(token: String): Long {
        val claims = Jwts.parser()
                .setSigningKey(jwtSettings.jwtSecret)
                .parseClaimsJws(token)
                .body
        return claims.expiration.time
    }

    override fun getUserRolesFromJWT(token: String): Set<Role> {
        val claims = Jwts.parser()
                .setSigningKey(jwtSettings.jwtSecret)
                .parseClaimsJws(token)
                .body

        val roles = claims.get("roles", List::class.java) ?: listOf<String>()
        return roles
                .asSequence()
                .map { role -> Role.valueOf(role as String) }
                .toSet()
    }

    override fun getUserIdFromJWT(token: String): Long {
        val claims = Jwts.parser()
                .setSigningKey(jwtSettings.jwtSecret)
                .parseClaimsJws(token)
                .body

        return claims.get("userId", Integer::class.java).toLong()
    }

    override fun getUserDetailsFromJWT(token: String): JwtUserDetails {
        val claims = Jwts.parser()
                .setSigningKey(jwtSettings.jwtSecret)
                .parseClaimsJws(token)
                .body

        val userDetails = JwtUserDetails()
        return userDetails
                .setUsername(claims.get("username", String::class.java))
                .setId(claims.get("userId", Integer::class.java).toLong())
                .setAuthorities(getUserRolesFromJWT(token))
    }

    override fun verifyToken(authToken: String): Boolean {
        try {
            Jwts.parser().setSigningKey(jwtSettings.jwtSecret).parseClaimsJws(authToken)
        } catch (ex: JwtException) {
            logger.error(ex.message)
            throw JwtAuthenticationException(ex.message)
        } catch (ex: ExpiredJwtException) {
            logger.error(ex.message)
            throw JwtAuthenticationException(ex.message)
        } catch (ex: IllegalArgumentException) {
            logger.error(ex.message)
            throw JwtAuthenticationException(ex.message)
        }

        return true
    }

    override fun generateRegistrationToken(username: String): String {

        val uid = UUID.randomUUID().toString()

        val claims = Jwts.claims()
        claims["uid"] = uid
        claims["username"] = username

        val expirationDate = Date(Date().time + jwtSettings.jwtRegistrationExpirationInMs)

        return Jwts.builder()
                .setSubject(username)
                .setClaims(claims)
                .setIssuedAt(Date())
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, jwtSettings.jwtSecret)
                .compact()
    }
}
