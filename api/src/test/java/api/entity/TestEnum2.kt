package api.entity

import api.entity.Role
import api.search.enumeration.EnumResource

@EnumResource(secured = [Role.ROLE_READ])
enum class TestEnum2{
    GET, POST
}