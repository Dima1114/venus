package api.config

import api.entity.Role
import org.springframework.core.annotation.AliasFor
import org.springframework.security.access.annotation.Secured

import java.lang.annotation.*

@Target(AnnotationTarget.FUNCTION, AnnotationTarget.PROPERTY_GETTER, AnnotationTarget.PROPERTY_SETTER, AnnotationTarget.CLASS, AnnotationTarget.FILE)
@Inherited
@MustBeDocumented
@Secured
annotation class RoleSecured(vararg val value: Role = [])
