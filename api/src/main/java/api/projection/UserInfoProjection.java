package api.projection;

import api.entity.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "info", types = User.class)
public interface UserInfoProjection extends BaseProjection{

    String getUsername();
    String getEmail();
}
