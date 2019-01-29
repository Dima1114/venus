package api.search.enumeration

import com.nhaarman.mockito_kotlin.whenever
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders


@RunWith(MockitoJUnitRunner::class)
class EnumResourceControllerTest {

    @InjectMocks
    lateinit var testSubject: EnumResourceController

    @Mock
    lateinit var enumResourceService: EnumResourceService

    private lateinit var mvc: MockMvc

    @Before
    fun setup() {

        mvc = MockMvcBuilders
                .standaloneSetup(testSubject)
                .build()
    }

    @Test
    fun `should call service and return response list`() {

        //given
        whenever(enumResourceService.getEnumResource("testEnum"))
                .thenReturn(TestEnum.values().map { mapOf("name" to it.name) }.toList())

        //when
        val result = this.mvc.perform(get("/api/enums/testEnum").accept(MediaType.APPLICATION_JSON))

        //then
        result.andExpect(status().isOk)
                .andExpect(jsonPath("$.content").exists())
                .andExpect(jsonPath("$.content.length()").value(7))
    }
}