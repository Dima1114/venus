package api.service.impl

import api.entity.Role
import api.entity.User
import api.jms.JmsMessage
import api.repository.UserRepository
import api.service.UserService
import org.springframework.jms.core.JmsTemplate
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserServiceImpl(private val userRepository: UserRepository, private val jmsTemplate: JmsTemplate) : UserService {

    override fun dropRefreshToken(username: String): Int? = userRepository.dropRefreshToken(username)

    override fun saveUser(user: User): User = userRepository.save(user)

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
                                "<a href='http://localhost:3000/registration/complete?token=$token'>Click here to Complete Registration</a>",
                        "Registration"))

        return user
    }

    override fun saveNewPassword(username: String) {

        val user = findByUsername(username)
                .orElseThrow { UsernameNotFoundException("username : $username does not exist") }

        val password = UUID.randomUUID().toString().substring(0, 10)
        user.password = password

        userRepository.save(user)
        jmsTemplate.convertAndSend("mailbox",
                JmsMessage(user.email!!,
                        "Your password has been changed.<br> New password: $password",
                        "Change Password"))
    }


}
