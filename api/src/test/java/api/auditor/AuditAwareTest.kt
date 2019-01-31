package api.auditor

import api.entity.User
import api.repository.UserRepository
import api.security.model.JwtAuthenticationToken
import api.security.model.JwtUserDetails
import com.nhaarman.mockito_kotlin.whenever
import org.amshove.kluent.`should be`
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.security.core.context.SecurityContextHolder
import java.util.*

@RunWith(MockitoJUnitRunner::class)
class AuditAwareTest {

    @InjectMocks
    lateinit var testSubject: AuditAwareImpl

    @Mock
    lateinit var userRepository: UserRepository

    @Before
    fun setUp() {
        val userDetails = JwtUserDetails().apply { username = "user" }
        SecurityContextHolder.getContext().authentication =
                JwtAuthenticationToken(userDetails, null, null, null)
    }

    @Test
    fun `should return logged user from context`() {

        //given
        val user = User().apply { username = "user" }
        whenever(userRepository.findByUsername("user")).thenReturn(Optional.of(user))

        //when
        val result = testSubject.currentAuditor.get()

        //then
        result `should be` user
    }
}