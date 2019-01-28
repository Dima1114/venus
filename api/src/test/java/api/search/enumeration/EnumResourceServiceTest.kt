package api.search.enumeration

import org.amshove.kluent.`should be equal to`
import org.amshove.kluent.`should contain`
import org.junit.Before
import org.junit.Test

class EnumResourceServiceTest{

    lateinit var enumResourceService: EnumResourceService

    @Before
    fun setUp(){
        enumResourceService = EnumResourceServiceImpl()
    }

    @Test
    fun `should find and return enum list by name`(){

        //when
        val result = enumResourceService.getEnumResource("testEnums")

        //then
        result.size `should be equal to` 7
        result `should contain` Pair("name", "GET")
        result `should contain` Pair("name", "POST")
        result `should contain` Pair("name", "HEAD")
        result `should contain` Pair("name", "PUT")
        result `should contain` Pair("name", "PATCH")
        result `should contain` Pair("name", "DELETE")
        result `should contain` Pair("name", "OPTION")
    }
}

@EnumResource
enum class TestEnum{
    GET, POST, HEAD, PUT, PATCH, DELETE, OPTION
}