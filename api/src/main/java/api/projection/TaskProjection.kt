package api.projection

import api.entity.Task
import api.entity.TaskStatus
import api.entity.TaskType
import api.entity.User
import org.springframework.data.rest.core.config.Projection
import java.time.LocalDateTime

@Projection(name = "info", types = [Task::class])
interface TaskProjection : BaseProjection {

    val title: String

    val comment: String

    val dateComplete: LocalDateTime?

    val dueDate: LocalDateTime?

    val userAdded: User?

    val type: TaskType

    val status: TaskStatus
}
