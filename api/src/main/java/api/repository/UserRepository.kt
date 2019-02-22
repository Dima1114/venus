package api.repository

import api.entity.User
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import java.util.*

@RepositoryRestResource
interface UserRepository : BaseRepository<User> {

    @EntityGraph(attributePaths = ["roles"])
    fun findByUsername(username: String): Optional<User>

    @Modifying
    @Query("update User u set u.refreshToken = null where u.username =:username")
    fun dropRefreshToken(@Param("username") username: String): Int?
}
