package api.service

import api.entity.User
import api.jms.JmsMessage
import api.repository.UserRepository
import api.service.impl.UserServiceImpl
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.times
import com.nhaarman.mockito_kotlin.verify
import com.nhaarman.mockito_kotlin.whenever
import org.amshove.kluent.`should be equal to`
import org.amshove.kluent.`should equal`
import org.amshove.kluent.`should not equal`
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers.anyString
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.jms.core.JmsTemplate
import java.util.*

@RunWith(MockitoJUnitRunner::class)
class UserServiceTest {

    @InjectMocks
    lateinit var testSubject: UserServiceImpl

    @Mock
    lateinit var userRepository: UserRepository
    @Mock
    lateinit var jmsTemplate: JmsTemplate

    @Test
    fun `should call repository to delete token`() {

        //given
        whenever(userRepository.dropRefreshToken(any())).thenReturn(1)

        //when
        testSubject.dropRefreshToken("user")

        //then
        verify(userRepository, times(1)).dropRefreshToken(any())
    }

    @Test
    fun `should get user by username`() {

        //given
        whenever(userRepository.findByUsername(any())).thenReturn(Optional.of(User().apply { username = "user" }))

        //when
        val result = testSubject.findByUsername("user")

        //then
        result.isPresent `should be equal to` true
        result.get().username `should equal` "user"
        verify(userRepository, times(1)).findByUsername(any())
    }

    @Test
    fun `should create new user and send jms message`() {

        //given
        whenever(userRepository.save(org.amshove.kluent.any(User::class))).thenReturn(User())


        //when
        val result = testSubject.registerNewUser("user", "password", "email", "token")

        //then
        result.username `should equal` "user"
        result.password `should not equal` "password"
        result.email `should equal` "email"
        result.refreshToken `should equal` "token"

        verify(userRepository, times(1)).save(org.amshove.kluent.any(User::class))
        verify(jmsTemplate, times(1)).convertAndSend(anyString(), org.amshove.kluent.any(JmsMessage::class))
    }

    @Test
    fun `should enable user`() {

        //given
        val user = User().apply { isEnabled = false }
        whenever(userRepository.save(org.amshove.kluent.any(User::class))).thenReturn(user)


        //when
        val result = testSubject.completeRegistration(user)

        //then
        result.isEnabled `should be equal to` true

        verify(userRepository, times(1)).save(org.amshove.kluent.any(User::class))
    }
}