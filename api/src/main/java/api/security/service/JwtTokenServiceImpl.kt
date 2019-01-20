package api.security.service

import api.entity.Role
import api.entity.User
import api.repository.UserRepository
import api.security.config.JwtSettings
import api.security.exceptions.JwtAuthenticationException
import api.security.model.JwtUserDetails
import io.jsonwebtoken.*
import org.apache.log4j.Logger
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component

import java.util.Date
import java.util.UUID
import java.util.stream.Collectors

@Component
class JwtTokenServiceImpl(private val jwtSettings: JwtSettings, private val userRepository: UserRepository) : JwtTokenService {

    override fun updateRefreshToken(username: String, refreshToken: String) {
        val user = userRepository.findByUsername(username)
                .orElseThrow { ArithmeticException("User not found") }

        user.refreshToken = refreshToken
        userRepository.save(user)
    }

    override fun generateAccessToken(userDetails: UserDetails): String {

        val now = Date()
        val expiryDate = Date(now.time + jwtSettings.jwtExpirationInMs)

        val claims = Jwts.claims()
        claims["roles"] = userDetails.authorities.map{ it.toString() }
        claims["username"] = userDetails.username
        claims["userId"] = (userDetails as JwtUserDetails).getId()

        return Jwts.builder()
                .setSubject(userDetails.username)
                .setClaims(claims)
                .setIssuedAt(Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSettings.jwtSecret)
                .compact()
    }

    override fun generateRefreshToken(userDetails: UserDetails): String {

        val uid = UUID.randomUUID().toString()

        val claims = Jwts.claims()
        claims["uid"] = uid
        claims["userId"] = (userDetails as JwtUserDetails).getId()

        val now = Date()
        val expiryDate = Date(now.time + jwtSettings.jwtRefreshExpirationInMs)

        return Jwts.builder()
                .setSubject(userDetails.username)
                .setClaims(claims)
                .setIssuedAt(Date())
                .setExpiration(expiryDate)
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

        return claims.get("roles", List::class.java)
                .asSequence()
                .map { role -> Role.valueOf(role as String) }
                .toSet()
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
        } catch (ex: SignatureException) {
            logger.error("Invalid JWT signature")
            throw JwtAuthenticationException(ex.message)
        } catch (ex: MalformedJwtException) {
            logger.error("Invalid JWT signature")
            throw JwtAuthenticationException(ex.message)
        } catch (ex: ExpiredJwtException) {
            logger.error("Invalid JWT signature")
            throw JwtAuthenticationException(ex.message)
        } catch (ex: UnsupportedJwtException) {
            logger.error("Invalid JWT signature")
            throw JwtAuthenticationException(ex.message)
        } catch (ex: IllegalArgumentException) {
            logger.error("Invalid JWT signature")
            throw JwtAuthenticationException(ex.message)
        }

        return true
    }

    companion object {

        private val logger = Logger.getLogger(JwtTokenService::class.java)
    }


}
