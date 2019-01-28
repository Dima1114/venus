package api.config

import api.config.auditor.AuditAwareImpl
import api.entity.TestEntity
import api.projection.TestProjection
import api.repository.UserRepository
import com.nhaarman.mockito_kotlin.whenever
import org.amshove.kluent.`should be equal to`
import org.amshove.kluent.`should be instance of`
import org.amshove.kluent.`should have value`
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.data.rest.core.config.ProjectionDefinitionConfiguration
import org.springframework.data.rest.core.config.RepositoryRestConfiguration

@RunWith(MockitoJUnitRunner::class)
class RestConfigTest {

    lateinit var testSubject: RestConfig

    @Mock
    lateinit var userRepository: UserRepository

    @Mock
    lateinit var config: RepositoryRestConfiguration

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
        val result = testSubject.auditorProvider(userRepository)
        //then
        result `should be instance of` AuditAwareImpl::class
    }
}
