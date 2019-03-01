package api.config

import com.nhaarman.mockito_kotlin.*
import org.amshove.kluent.`should be instance of`
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer
import org.springframework.jms.config.DefaultJmsListenerContainerFactory
import org.springframework.jms.support.converter.MappingJackson2MessageConverter
import javax.jms.ConnectionFactory

@RunWith(MockitoJUnitRunner::class)
class CommonConfigTest {

    val testSubject = CommonConfig()

    @Mock
    lateinit var configurer: DefaultJmsListenerContainerFactoryConfigurer
    @Mock
    lateinit var connectionFactory: ConnectionFactory

    @Test
    fun `should return jms listener container factory`(){

        //given
        doNothing().whenever(configurer).configure(any(), any())

        //when
        val result = testSubject.containerFactory(connectionFactory, configurer)

        //then
        verify(configurer, times(1)).configure(any(), any())
        result `should be instance of` DefaultJmsListenerContainerFactory::class
    }

    @Test
    fun `should return jackson message converter`(){

        //when
        val result = testSubject.jacksonJmsMessageConverter()

        //then
        result `should be instance of` MappingJackson2MessageConverter::class
    }
}