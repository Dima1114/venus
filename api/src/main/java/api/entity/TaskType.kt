package api.entity

import api.search.enumeration.EnumResource

@EnumResource(secured = [Role.ROLE_READ])
enum class TaskType {
    URGENT, NORMAL, OPTIONAL
}
