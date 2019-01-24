package api.config

import org.reflections.Reflections
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean
import org.springframework.data.rest.core.config.Projection
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import org.springframework.data.web.config.EnableSpringDataWebSupport

import java.util.stream.Stream

@Configuration
open class RestConfig : RepositoryRestConfigurer {

    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration) {
        registerRepositoryProjections(config, "api/projection")
    }

    private fun registerRepositoryProjections(config: RepositoryRestConfiguration, vararg packages: String) {
        Stream.of(*packages).forEach { packageName ->
            val reflections = Reflections(packageName)
            reflections.getTypesAnnotatedWith(Projection::class.java)
                    .forEach { projection -> config.projectionConfiguration.addProjection(projection) }
        }
    }
}
