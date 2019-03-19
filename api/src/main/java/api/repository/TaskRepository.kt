package api.repository

import api.entity.Task
import api.entity.TaskStatus
import api.entity.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource

@RepositoryRestResource
interface TaskRepository : BaseRepository<Task> {

    //    @Secured("ROLE_WRITE")
    fun findAllByUserAdded(user: User, pageable: Pageable): Page<Task>

    @RestResource(path = "setStatus", rel = "setStatus")
    @Modifying
    @Query("update Task task set task.status = :status where task.id in (:idList)")
    fun updateStatuses(@Param("idList") idList: List<Long>, @Param("status") status: TaskStatus)
}
