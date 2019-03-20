package api.config

import api.auditor.AuditAwareImpl
import api.entity.User
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.module.SimpleModule
import api.json.JsonLocalDateDeserializer
import api.json.JsonLocalDateSerializer
import api.json.JsonLocalDateTimeDeserializer
import api.json.JsonLocalDateTimeSerializer
import org.reflections.Reflections
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.domain.AuditorAware
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean
import org.springframework.data.rest.core.config.Projection
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import java.time.LocalDate
import java.time.LocalDateTime

@Configuration
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = ["api.repository"],
        repositoryFactoryBeanClass = JpaRepositoryFactoryBean::class)
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

    override fun configureJacksonObjectMapper(objectMapper: ObjectMapper) {
        val module = SimpleModule("LocalDateModule")
        with(module) {
            addSerializer(LocalDate::class.java, JsonLocalDateSerializer())
            addDeserializer(LocalDate::class.java, JsonLocalDateDeserializer())
            addSerializer(LocalDateTime::class.java, JsonLocalDateTimeSerializer())
            addDeserializer(LocalDateTime::class.java, JsonLocalDateTimeDeserializer())
        }
        objectMapper.registerModule(module)
    }

    @Bean
    fun auditorProvider(): AuditorAware<User> = AuditAwareImpl()
}
