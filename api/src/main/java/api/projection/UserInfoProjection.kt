package api.projection

import api.entity.User
import org.springframework.data.rest.core.config.Projection

@Projection(name = "info", types = arrayOf(User::class))
interface UserInfoProjection : BaseProjection {

    val username: String
    val email: String
}
