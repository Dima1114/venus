package api.service

import api.repository.UserRepository
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.times
import com.nhaarman.mockito_kotlin.verify
import com.nhaarman.mockito_kotlin.whenever
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class UserServiceTest {

    @InjectMocks
    lateinit var testSubject: UserServiceImpl

    @Mock
    lateinit var userRepository: UserRepository

    @Test
    fun `should call repository to delete token`() {

        //given
        whenever(userRepository.dropRefreshToken(any())).thenReturn(1)

        //when
        testSubject.dropRefreshToken("user")

        //then
        verify(userRepository, times(1)).dropRefreshToken(any())
    }
}