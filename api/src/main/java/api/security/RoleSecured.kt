package api.security

import api.entity.Role
import java.lang.annotation.*

@Target(AnnotationTarget.FUNCTION,
        AnnotationTarget.PROPERTY_GETTER,
        AnnotationTarget.PROPERTY_SETTER,
        AnnotationTarget.CLASS,
        AnnotationTarget.FILE)
@Inherited
@MustBeDocumented
annotation class RoleSecured(vararg val value: Role = [])
