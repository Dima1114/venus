package api.security.model

import javax.validation.constraints.NotBlank

class LoginRequest {

    @NotBlank(message = "Username is absent")
    var username: String = ""
    @NotBlank(message = "Password is absent")
    var password: String = ""
}
