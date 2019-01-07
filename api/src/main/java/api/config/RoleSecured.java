package api.config;

import api.entity.Role;
import org.springframework.core.annotation.AliasFor;
import org.springframework.security.access.annotation.Secured;

import java.lang.annotation.*;

@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@Secured({})
public @interface RoleSecured{

    @AliasFor(annotation = Secured.class)
    Role[] value() default {};
}
