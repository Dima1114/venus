package api.search.enumeration

import api.entity.Role
import api.security.exceptions.JwtAuthenticationException
import api.security.model.JwtAuthenticationToken
import api.security.model.JwtUserDetails
import org.amshove.kluent.`should be equal to`
import org.amshove.kluent.`should contain`
import org.atteo.evo.inflector.English
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.security.core.context.SecurityContextHolder

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

    @Test(expected = JwtAuthenticationException::class)
    fun `should forbid access to secured enum list because of lack of authorities`(){

        //given
        setUpSecurityContextHolder(Role.ROLE_WRITE)

        //when
        enumResourceService.getEnumResource("testEnum2")
    }

    @Test
    fun `should return enum list secured with role`(){

        //given
        setUpSecurityContextHolder(Role.ROLE_WRITE, Role.ROLE_READ)

        //when
        val result = enumResourceService.getEnumResource("testEnum2")

        //then
        result.size `should be equal to` 2
        result `should contain` mapOf("name" to "GET")
        result `should contain` mapOf("name" to "POST")
    }

    private fun setUpSecurityContextHolder(vararg roles: Role){
        val userDetails = JwtUserDetails().apply {
            username = "user"
            setAuthorities(roles.toSet())
        }
        SecurityContextHolder.getContext().authentication =
                JwtAuthenticationToken(userDetails, null, null, null)
    }
}

@EnumResource
enum class TestEnum{
    GET, POST, HEAD, PUT, PATCH, DELETE, OPTION
}

@EnumResource(secured = [Role.ROLE_READ])
enum class TestEnum2{
    GET, POST
}