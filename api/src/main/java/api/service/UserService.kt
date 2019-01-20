package api.service

interface UserService {

    fun dropRefreshToken(username: String): Int?
}
