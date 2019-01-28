package api.config.auditor

import api.entity.User
import api.repository.UserRepository
import api.security.model.JwtUserDetails
import api.security.model.getUser
import org.springframework.data.domain.AuditorAware
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.transaction.annotation.Transactional
import java.util.*

open class AuditAwareImpl(private val userRepository: UserRepository) : AuditorAware<User> {

    @Transactional(readOnly = true)
    override fun getCurrentAuditor(): Optional<User> {
        val user = SecurityContextHolder.getContext()
                ?.authentication
                ?.let { it as UsernamePasswordAuthenticationToken }
                ?.principal
                ?.let{it as JwtUserDetails }
                ?.getUser()

        return Optional.ofNullable(user)
    }
}