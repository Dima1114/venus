package api.repository

import api.entity.Task
import api.entity.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource
interface TaskRepository : BaseRepository<Task>{

    //    @Secured("ROLE_WRITE")
    fun findAllByUserAdded(user: User, pageable: Pageable): Page<Task>
}
