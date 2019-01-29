package api.security.config

import org.amshove.kluent.`should be`
import org.junit.Test

class JwtSettingsTest {

    private val testSubject = JwtSettings()

    @Test
    fun `settings should be taken from properties`(){

        //then
        testSubject.jwtSecret `should be` "security"
        testSubject.jwtExpirationInMs `should be` 3600000
        testSubject.jwtRefreshExpirationInMs `should be` 432000000
    }
}