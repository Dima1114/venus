package api.json

import com.fasterxml.jackson.databind.JsonDeserializer
import com.fasterxml.jackson.databind.JsonSerializer
import com.nhaarman.mockito_kotlin.times
import com.nhaarman.mockito_kotlin.verify
import com.nhaarman.mockito_kotlin.whenever
import org.amshove.kluent.`should be equal to`
import org.amshove.kluent.any
import org.amshove.kluent.mock
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentCaptor
import org.mockito.Captor
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class LocalDateTimeModuleTest{

    @Captor
    lateinit var serializerCaptor: ArgumentCaptor<JsonSerializer<*>>
    @Captor
    lateinit var deserializerCaptor: ArgumentCaptor<JsonDeserializer<*>>

    @Test
    fun `after init should contain serializers and deserializers`(){

        //given
        val module = mock(LocalDateModule::class)
        whenever(module.addSerializer(any(Class::class), any())).thenReturn(module)
        whenever(module.addDeserializer(any(Class::class), any())).thenReturn(module)

        //then
        verify(module, times(2)).addSerializer(any(), serializerCaptor.capture())
        serializerCaptor.allValues.size `should be equal to` 2
        verify(module, times(2)).addDeserializer(any(), deserializerCaptor.capture())
        deserializerCaptor.allValues.size `should be equal to` 2
    }
}