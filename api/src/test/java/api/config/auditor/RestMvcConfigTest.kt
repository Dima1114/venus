package api.config.auditor

import api.config.RestMvcConfig
import api.search.ApiQuerydslBindingsFactory
import api.search.ApiQuerydslMethodArgumentResolver
import com.nhaarman.mockito_kotlin.spy
import com.nhaarman.mockito_kotlin.whenever
import org.amshove.kluent.`should be instance of`
import org.amshove.kluent.any
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Spy
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.beans.factory.ListableBeanFactory
import org.springframework.beans.factory.ObjectFactory
import org.springframework.context.ApplicationContext
import org.springframework.core.convert.ConversionService
import org.springframework.data.querydsl.SimpleEntityPathResolver
import org.springframework.data.repository.support.Repositories
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import org.springframework.format.support.DefaultFormattingConversionService
import org.springframework.test.util.ReflectionTestUtils

@RunWith(MockitoJUnitRunner::class)
class RestMvcConfigTest {

    @Spy
    @InjectMocks
    lateinit var testSubject: RestMvcConfig

    @Mock
    lateinit var context: ApplicationContext

    @Mock
    lateinit var conversionService: ObjectFactory<ConversionService>

    @Mock
    lateinit var listableFatory: ListableBeanFactory

    @Before
    fun setUp(){
        testSubject.afterPropertiesSet()
        whenever(context.getBeanNamesForType(any(), any(), any())).thenReturn(arrayOf())
        ReflectionTestUtils.setField(testSubject, "applicationContext", context)

    }

    @Test
    fun `querydsl bindings factory should be configured`(){

        //when
        val result = testSubject.querydslBindingsFactory()
        val pathResolver = result.entityPathResolver

        //then
        result `should be instance of` ApiQuerydslBindingsFactory::class
        pathResolver `should be instance of` SimpleEntityPathResolver::class
    }

    @Test
    fun `querydsl method argument resolver`(){

        //when
        val result = testSubject.querydslMethodArgumentResolver()

        //then
        result `should be instance of` ApiQuerydslMethodArgumentResolver::class
    }
}