package api.config.auditor

import api.entity.User
import api.repository.UserRepository
import api.security.model.JwtUserDetails
import org.springframework.data.domain.AuditorAware
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.transaction.annotation.Transactional
import java.util.*

open class AuditAwareImpl(private val userRepository: UserRepository) : AuditorAware<User> {

    @Transactional(readOnly = true)
    override fun getCurrentAuditor(): Optional<User> {
        val username = SecurityContextHolder.getContext()
                ?.authentication
                ?.let { it as UsernamePasswordAuthenticationToken }
                ?.principal
                ?.let{it as JwtUserDetails }
                ?.username

        return username?.let { userRepository.findByUsername(it) } ?: Optional.empty()
    }
}