package api.search.enumeration

import api.entity.Role
import java.lang.annotation.Inherited

@Target(AnnotationTarget.CLASS)
@Inherited
@MustBeDocumented
annotation class EnumResource(vararg val secured: Role = [])
