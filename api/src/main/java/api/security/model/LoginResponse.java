package api.security.model;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(content = JsonInclude.Include.NON_NULL)
public class LoginResponse {

    private String accessToken;
    private String refreshToken;
    private String username;
    private long expTime;

    public LoginResponse() {
    }

    public LoginResponse(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public LoginResponse(String accessToken, String refreshToken, String username, long expTime) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.username = username;
        this.expTime = expTime;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public LoginResponse setAccessToken(String accessToken) {
        this.accessToken = accessToken;
        return this;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public LoginResponse setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public LoginResponse setUsername(String username) {
        this.username = username;
        return this;
    }

    public long getExpTime() {
        return expTime;
    }

    public LoginResponse setExpTime(long expTime) {
        this.expTime = expTime;
        return this;
    }
}
