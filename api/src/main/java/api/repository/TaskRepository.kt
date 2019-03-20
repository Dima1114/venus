package api.repository

import api.entity.Task
import api.entity.TaskStatus
import api.entity.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@RepositoryRestResource
interface TaskRepository : BaseRepository<Task> {

    //    @Secured("ROLE_WRITE")
    fun findAllByUserAdded(user: User, pageable: Pageable): Page<Task>

    @Transactional
    @Modifying
    @Query("update Task task set task.status = :status, task.dateComplete = :dateComplete where task.id in (:idList)")
    fun updateStatuses(@Param("idList") idList: List<Long>, @Param("status") status: TaskStatus, @Param("dateComplete") dateComplete: LocalDateTime)
}
