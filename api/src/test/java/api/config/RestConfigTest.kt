package api.config

import api.auditor.AuditAwareImpl
import api.entity.TestEntity
import api.projection.TestProjection
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.module.SimpleModule
import com.nhaarman.mockito_kotlin.spy
import com.nhaarman.mockito_kotlin.whenever
import org.amshove.kluent.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentCaptor
import org.mockito.Captor
import org.mockito.Mock
import org.mockito.Mockito
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.data.rest.core.config.ProjectionDefinitionConfiguration
import org.springframework.data.rest.core.config.RepositoryRestConfiguration

@RunWith(MockitoJUnitRunner::class)
class RestConfigTest {

    lateinit var testSubject: RestConfig

    @Mock
    lateinit var config: RepositoryRestConfiguration

    @Captor
    private lateinit var moduleCaptor: ArgumentCaptor<SimpleModule>

    @Before
    fun setUp(){
        testSubject = RestConfig()
    }

    @Test
    fun `registered repository projections`(){

        //given
        val projectionConfiguration = ProjectionDefinitionConfiguration()
        whenever(config.projectionConfiguration).thenReturn(projectionConfiguration)

        //when
        testSubject.configureRepositoryRestConfiguration(config)
        val projectionsMap = config.projectionConfiguration.getProjectionsFor(TestEntity::class.java)

        //then
        projectionsMap.size `should be equal to` 1
        projectionsMap `should have value` TestProjection::class.java
    }

    @Test
    fun `auditor provider is configured`(){

        //when
        val result = testSubject.auditorProvider()
        //then
        result `should be instance of` AuditAwareImpl::class
    }

    @Test
    fun `registered object mapper module exists`(){

        //given
        val objectMapper = spy(ObjectMapper())

        //when
        testSubject.configureJacksonObjectMapper(objectMapper)

        //then
        Mockito.verify(objectMapper).registerModule(moduleCaptor.capture())
        moduleCaptor.value.moduleName `should be equal to` "LocalDateModule"
    }
}
