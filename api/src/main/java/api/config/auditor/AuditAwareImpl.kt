package api.config.auditor

import api.entity.User
import api.service.getUserFromContext
import org.springframework.data.domain.AuditorAware
import java.util.*

open class AuditAwareImpl : AuditorAware<User> {

    override fun getCurrentAuditor(): Optional<User> {

        val user = getUserFromContext()
        return Optional.ofNullable(user)
    }
}