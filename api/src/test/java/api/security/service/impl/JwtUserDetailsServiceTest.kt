package api.security.service.impl

import api.entity.User
import api.repository.UserRepository
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.whenever
import org.amshove.kluent.`should equal`
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.security.core.userdetails.UsernameNotFoundException
import java.util.*

@RunWith(MockitoJUnitRunner::class)
class JwtUserDetailsServiceTest {

    @InjectMocks
    lateinit var testSubject: JwtUserDetailsService

    @Mock
    lateinit var userRepository: UserRepository

    @Test
    fun `should return user`() {

        //given
        val user = User().apply { username = "user" }
        whenever(userRepository.findByUsername(any())).thenReturn(Optional.of(user))

        //when
        val usr = testSubject.loadUserByUsername("user")

        //then
        usr.username `should equal` user.username
    }

    @Test(expected = UsernameNotFoundException::class)
    fun `should throw exception`() {

        //given
        whenever(userRepository.findByUsername(any())).thenThrow(UsernameNotFoundException("username does not exist"))

        //when
        testSubject.loadUserByUsername("user")
    }

}