package api.service

import api.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserServiceImpl(private val userRepository: UserRepository) : UserService {

    @Transactional
    override fun dropRefreshToken(username: String): Int? {
        return userRepository.dropRefreshToken(username)
    }
}
