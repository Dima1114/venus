package api.security.service

import api.entity.Role
import api.security.model.JwtUserDetails
import org.springframework.security.core.userdetails.UserDetails

interface JwtTokenService {

    fun updateRefreshToken(username: String, refreshToken: String)
    fun generateAccessToken(userDetails: UserDetails): String
    fun generateRefreshToken(userDetails: UserDetails): String
    fun getUsernameFromJWT(token: String): String
    fun getExpTimeFromJWT(token: String): Long

    fun getUserRolesFromJWT(token: String): Set<Role>

    fun getUserDetailsFromJWT(token: String): JwtUserDetails

    fun verifyToken(authToken: String): Boolean
}
