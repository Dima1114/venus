package api.security.service.impl

import api.repository.UserRepository
import api.security.config.JwtSettings
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class JwtTokenService {

    @InjectMocks
    lateinit var testSubject: JwtTokenService

    @Mock
    lateinit var userRepository: UserRepository
    @Mock
    lateinit var jwtSettings: JwtSettings

    @Before
    fun setUp() {

    }

    @Test
    fun `update refresh token success`(){

    }
}