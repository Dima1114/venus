package api.search.enumeration

import api.entity.Role
import api.security.exceptions.JwtAuthenticationException
import org.amshove.kluent.`should be equal to`
import org.amshove.kluent.`should contain`
import org.atteo.evo.inflector.English
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.junit.MockitoJUnitRunner

class EnumResourceServiceTest{

    lateinit var enumResourceService: EnumResourceService

    @Before
    fun setUp(){
        enumResourceService = EnumResourceServiceImpl("api/search")
    }

    @Test
    fun `should find and return enum list by name`(){

        //when
        val result = enumResourceService.getEnumResource("testEnum")

        //then
        result.size `should be equal to` 7
        result `should contain` mapOf("name" to "GET")
        result `should contain` mapOf("name" to "POST")
        result `should contain` mapOf("name" to "HEAD")
        result `should contain` mapOf("name" to "PUT")
        result `should contain` mapOf("name" to "PATCH")
        result `should contain` mapOf("name" to "DELETE")
        result `should contain` mapOf("name" to "OPTION")
    }

    @Test
    fun `should find and return enum list by name from particular package`(){

        //when
        val result = enumResourceService.getEnumResource("testEnum", "api/entity")

        //then
        result.size `should be equal to` 2
        result `should contain` Pair("name", "JAVA")
        result `should contain` Pair("name", "KOTLIN")
    }

    @Test(expected = JwtAuthenticationException::class)
    fun `should forbid access to secured enum list`(){

        //when
        enumResourceService.getEnumResource("testEnum2")
    }
}

@EnumResource
enum class TestEnum{
    GET, POST, HEAD, PUT, PATCH, DELETE, OPTION
}

@EnumResource(secured = [Role.ROLE_READ])
enum class TestEnum2{
    GET, POST, HEAD, PUT, PATCH, DELETE, OPTION
}