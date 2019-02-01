package api.entity

import api.search.enumeration.EnumResource

@EnumResource(secured = [Role.ROLE_READ])
enum class TestEnum2{
    GET, POST
}