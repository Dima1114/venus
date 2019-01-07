package api.config;

import org.reflections.Reflections;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.Projection;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import java.util.stream.Stream;

@Configuration
public class RestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        registerRepositoryProjections(config, "api/projection");
    }

    private void registerRepositoryProjections(RepositoryRestConfiguration config, String... packages){
        Stream.of(packages).forEach(packageName -> {
            Reflections reflections = new Reflections(packageName);
            reflections.getTypesAnnotatedWith(Projection.class)
                    .forEach(projection -> config.getProjectionConfiguration().addProjection(projection));
        });
    }
}
