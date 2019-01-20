package api

import api.security.model.JwtAuthenticationToken
import org.junit.Test
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class Test {

    @Test
    fun test(){

        assertTrue { UsernamePasswordAuthenticationToken::class.java.isAssignableFrom(JwtAuthenticationToken::class.java) }
        assertFalse { UsernamePasswordAuthenticationToken::class.java == JwtAuthenticationToken::class.java }

        val clazz = JwtAuthenticationToken::class.java
        assertTrue { JwtAuthenticationToken::class.java == clazz }
    }
}