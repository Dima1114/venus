package api.projection

import api.entity.Task
import org.springframework.data.rest.core.config.Projection

@Projection(name = "info", types = arrayOf(Task::class))
interface TaskProjection : BaseProjection {

    val title: String
}
