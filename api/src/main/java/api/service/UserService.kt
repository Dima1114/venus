package api.service

import api.entity.User
import java.util.*

interface UserService {

    fun dropRefreshToken(username: String): Int?

    fun registerNewUser(username: String, password: String, email: String, token: String) : User

    fun findByUsername(username: String) : Optional<User>

    fun completeRegistration(user: User): User
}
