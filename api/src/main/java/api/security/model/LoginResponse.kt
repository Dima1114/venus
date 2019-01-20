package api.security.model

import com.fasterxml.jackson.annotation.JsonInclude

@JsonInclude(content = JsonInclude.Include.NON_NULL)
class LoginResponse {

    private var accessToken: String? = null
    private var refreshToken: String? = null
    private var username: String? = null
    private var expTime: Long = 0

    constructor() {}

    constructor(accessToken: String, refreshToken: String) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }

    constructor(accessToken: String, refreshToken: String, username: String, expTime: Long) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.username = username
        this.expTime = expTime
    }

    fun getAccessToken(): String? {
        return accessToken
    }

    fun setAccessToken(accessToken: String): LoginResponse {
        this.accessToken = accessToken
        return this
    }

    fun getRefreshToken(): String? {
        return refreshToken
    }

    fun setRefreshToken(refreshToken: String): LoginResponse {
        this.refreshToken = refreshToken
        return this
    }

    fun getUsername(): String? {
        return username
    }

    fun setUsername(username: String): LoginResponse {
        this.username = username
        return this
    }

    fun getExpTime(): Long {
        return expTime
    }

    fun setExpTime(expTime: Long): LoginResponse {
        this.expTime = expTime
        return this
    }
}
