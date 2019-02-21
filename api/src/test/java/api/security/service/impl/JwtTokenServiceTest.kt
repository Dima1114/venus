package api.security.service.impl

import api.entity.Role
import api.entity.User
import api.repository.UserRepository
import api.security.config.JwtSettings
import api.security.exceptions.JwtAuthenticationException
import api.security.model.JwtUserDetails
import api.security.service.JwtTokenService
import com.nhaarman.mockito_kotlin.doNothing
import com.nhaarman.mockito_kotlin.times
import com.nhaarman.mockito_kotlin.verify
import com.nhaarman.mockito_kotlin.whenever
import org.amshove.kluent.`should be equal to`
import org.amshove.kluent.`should be`
import org.amshove.kluent.`should not be equal to`
import org.amshove.kluent.any
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.util.ResourceUtils
import java.io.File
import java.util.*
import kotlin.test.assertNotNull
import kotlin.test.expect
import org.junit.rules.ExpectedException



@RunWith(MockitoJUnitRunner::class)
class JwtTokenServiceTest {

    @InjectMocks
    lateinit var testSubject: JwtTokenServiceImpl

    @Mock
    lateinit var userRepository: UserRepository
    @Mock
    lateinit var jwtSettings: JwtSettings

    @get:Rule
    var thrown = ExpectedException.none()

    @Before
    fun setUp() {
        whenever(jwtSettings.jwtExpirationInMs).thenReturn(1000)
        whenever(jwtSettings.jwtRefreshExpirationInMs).thenReturn(1000)
        whenever(jwtSettings.jwtSecret).thenReturn("secret")

        user.refreshToken = null
    }

    companion object {
        val user = User().apply {
            username = "user"
            password = "password"
            email = "email"
            roles = mutableSetOf(Role.ROLE_READ, Role.ROLE_WRITE)
            refreshToken = null
        }

        val userDetails = JwtUserDetails.create(user)
    }

    @Test
    fun `update refresh token success`() {

        //given
        whenever(userRepository.findByUsername("user")).thenReturn(Optional.of(user))
        whenever(userRepository.save(user)).thenReturn(User())
        user.refreshToken `should be` null

        //when
        testSubject.updateRefreshToken("user", "token")

        //then
        user.refreshToken `should be` "token"
        verify(userRepository, times(1)).save<User>(any())
    }

    @Test(expected = JwtAuthenticationException::class)
    fun `update refresh token fail user not found`() {

        //given
        whenever(userRepository.findByUsername("user")).thenThrow(JwtAuthenticationException("User not found"))

        //when
        testSubject.updateRefreshToken("user", "token")
    }

    @Test
    fun `should fail token verification`(){

        //given
        val token = loadToken("expired")

        //when
        thrown.expect(JwtAuthenticationException::class.java)
        testSubject.verifyToken(token)
    }

    @Test
    fun `should generate a valid token`(){

        //when
        val token = testSubject.generateAccessToken(userDetails)

        //then
        testSubject.verifyToken(token) `should be equal to` true

    }

    private fun loadToken(name: String): String =
            ResourceUtils.getFile("classpath:tokens/$name.txt")
                    .readText(Charsets.UTF_8)
}