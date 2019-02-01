package api.search

import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.data.querydsl.EntityPathResolver
import org.springframework.data.util.TypeInformation
import org.springframework.util.ConcurrentReferenceHashMap
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap

@RunWith(MockitoJUnitRunner::class)
class ApiQuerydslBindingsFactoryTest {

    lateinit var testSubject: ApiQuerydslBindingsFactory

    @Mock
    lateinit var entityPathResolver : EntityPathResolver

    @Before
    fun setUp(){
        testSubject = ApiQuerydslBindingsFactory(entityPathResolver, ConcurrentReferenceHashMap())
    }

    @Test
    fun `should customize query bindings`(){

        //given
        val params: MultiValueMap<String, String> = LinkedMultiValueMap()
//        val type: TypeInformation<*> =
    }
}