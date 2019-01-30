package api.config

import api.config.auditor.AuditAwareImpl
import api.entity.User
import api.repository.UserRepository
import org.reflections.Reflections
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.domain.AuditorAware
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.data.rest.core.config.Projection
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer

@Configuration
@EnableJpaAuditing
class RestConfig : RepositoryRestConfigurer {

    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration) {
        registerRepositoryProjections(config, "api/projection")
    }

    private fun registerRepositoryProjections(config: RepositoryRestConfiguration, vararg packages: String) {
        packages.forEach { packageName ->
            val reflections = Reflections(packageName)
            reflections.getTypesAnnotatedWith(Projection::class.java)
                    .forEach { projection -> config.projectionConfiguration.addProjection(projection) }
        }
    }

    @Bean
    fun auditorProvider(): AuditorAware<User> = AuditAwareImpl()
}
