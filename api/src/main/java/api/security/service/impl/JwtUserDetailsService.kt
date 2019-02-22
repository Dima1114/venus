package api.security.service.impl

import api.repository.UserRepository
import api.security.model.JwtUserDetails
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service("userDetailsService")
class JwtUserDetailsService(private val userRepository: UserRepository) : UserDetailsService {

    @Transactional
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)
                .orElseThrow { UsernameNotFoundException("username : $username does not exist") }
//        user.roles.size //TODO check in integration test
        return JwtUserDetails.create(user)
    }
}
