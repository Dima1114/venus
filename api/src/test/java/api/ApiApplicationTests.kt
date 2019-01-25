package api

import api.security.model.JwtAuthenticationToken
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.test.context.junit4.SpringRunner

import org.junit.Assert.assertTrue

//@RunWith(SpringRunner.class)
//@SpringBootTest
class ApiApplicationTests {

    @Test
    fun contextLoads() {

        UsernamePasswordAuthenticationToken::class.java.isAssignableFrom(JwtAuthenticationToken::class.java) `should be`
    }

}

