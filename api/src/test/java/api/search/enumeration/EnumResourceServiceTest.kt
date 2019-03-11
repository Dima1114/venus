package api.search.enumeration

import api.entity.Role
import api.security.exceptions.JwtAuthenticationException
import api.security.model.JwtAuthenticationToken
import api.security.model.JwtUserDetails
import org.amshove.kluent.`should be equal to`
import org.amshove.kluent.`should contain`
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.springframework.security.core.context.SecurityContextHolder

class EnumResourceServiceTest{

    lateinit var enumResourceService: EnumResourceService

    @Before
    fun setUp(){
        enumResourceService = EnumResourceServiceImpl("api/search")
    }

    @After
    fun clear(){
        SecurityContextHolder.getContext().authentication = null
    }

    @Test
    fun `should find and return enum list by name`(){

        //given
        setUpSecurityContextHolder(Role.ROLE_READ)

        //when
        val result = enumResourceService.getEnumResource("testEnum")

        //then
        result.size `should be equal to` 7
        result `should contain` EnumValue(0,"GET")
        result `should contain` EnumValue(1,"POST")
        result `should contain` EnumValue(2,"HEAD")
        result `should contain` EnumValue(3,"PUT")
        result `should contain` EnumValue(4,"PATCH")
        result `should contain` EnumValue(5,"DELETE")
        result `should contain` EnumValue(6,"OPTION")
    }

    @Test
    fun `should find and return enum list by name from particular package`(){

        //given
        setUpSecurityContextHolder(Role.ROLE_READ)

        //when
        val result = enumResourceService.getEnumResource("testEnum", "api/entity")

        //then
        result.size `should be equal to` 2
        result `should contain` EnumValue(0,"JAVA")
        result `should contain` EnumValue(1,"KOTLIN")
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
        result `should contain` EnumValue(0,"GET")
        result `should contain` EnumValue(1,"POST")
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