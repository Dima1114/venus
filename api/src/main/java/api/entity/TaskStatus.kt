package api.entity

import api.search.enumeration.EnumResource

@EnumResource
enum class TaskStatus {
    ACTIVE, COMPLETED, IN_BIN, OVERDUE
}