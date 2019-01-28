package api.security.config

import org.amshove.kluent.`should not be`
import org.junit.Test

class JwtSettingsTest {

    private val testSubject = JwtSettings()

    @Test
    fun `settings should be taken from properties`(){

        //then
        testSubject.jwtSecret `should not be` "security"
        testSubject.jwtExpirationInMs `should not be` 3600000
        testSubject.jwtRefreshExpirationInMs `should not be` 432000000
    }
}