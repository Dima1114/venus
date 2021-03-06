package api.projection;

import api.entity.Task;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "info", types = Task.class)
public interface TaskProjection extends BaseProjection {

    String getTitle();
}
