package api.security.model;

import javax.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "Username is absent")
    private String username;
    @NotBlank(message = "Password is absent")
    private String password;

    public String getUsername() {
        return username;
    }

    public LoginRequest setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public LoginRequest setPassword(String password) {
        this.password = password;
        return this;
    }
}
