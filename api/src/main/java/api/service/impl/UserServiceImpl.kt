package api.service.impl

import api.entity.Role
import api.entity.User
import api.jms.JmsMessage
import api.repository.UserRepository
import api.service.UserService
import org.springframework.jms.core.JmsTemplate
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserServiceImpl(private val userRepository: UserRepository, private val jmsTemplate: JmsTemplate) : UserService {

    override fun dropRefreshToken(username: String): Int? = userRepository.dropRefreshToken(username)

    override fun findByUsername(username: String): Optional<User> = userRepository.findByUsername(username)

    override fun registerNewUser(username: String, password: String, email: String, token: String): User {

        val user = User().apply {
            this.username = username
            this.password = password
            this.email = email
            isEnabled = false
            roles = mutableSetOf(Role.ROLE_USER)

            refreshToken = token
        }

        userRepository.save(user)
        jmsTemplate.convertAndSend("mailbox",
                JmsMessage(email,
                        "You have been successfully signed up at Venus ToDoList service.<br>" +
                                "To complete registration follow this link<br> " +
                                "<a>localhost:3000/auth/registration?token=$token</a>",
                        "Registration"))

        return user
    }

    override fun completeRegistration(user: User): User {
        user.isEnabled = true
        return userRepository.save(user)
    }
}
