package api.search.operator

import api.entity.TestEntity
import api.entity.TestEntity2
import api.entity.TestEnum
import api.integration.AbstractTestMvcIntegration
import api.repository.TestEntity2Repository
import api.repository.TestEntityRepository
import org.amshove.kluent.`should be equal to`
import org.amshove.kluent.`should be`
import org.amshove.kluent.`should not be`
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.ResultActions
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate

@RunWith(SpringRunner::class)
@SpringBootTest
@Transactional
class SearchOperatorTest : AbstractTestMvcIntegration() {

    @Autowired
    private lateinit var testEntityRepository: TestEntityRepository

    @Autowired
    private lateinit var testEntity2Repository: TestEntity2Repository

    companion object {

        val testEntity = TestEntity(name = "test_first", float = 1.5F)
        val testEntity2 = TestEntity(date = LocalDate.now().plusDays(1), name = "test_second", float = 2.5F)
        val testEntity3 = TestEntity(date = LocalDate.now().plusDays(2), name = "test_third", float = 3.5F)
        val testEntity4 = TestEntity(date = LocalDate.now().plusDays(3), name = "fourth")

        val child1 = TestEntity2(date = LocalDate.now().minusDays(1), type = TestEnum.JAVA)
        val child2 = TestEntity2(date = LocalDate.now().minusDays(2), num = 2)
        val child3 = TestEntity2(date = LocalDate.now().plusDays(3), num = 3)
//        val child4 = TestEntity2(parent = testEntity4, date = LocalDate.now().plusDays(4), num = 4)
    }

    @Before
    fun setUp(){
        testEntity.apply { child = child1 }
        testEntity2.apply { child = child2 }
        testEntity3.apply { child = child3 }
//        testEntity4.apply { child = child4 }

        testEntityRepository.saveAll(mutableListOf(testEntity, testEntity2, testEntity3, testEntity4))
    }

    @Test
    fun `test repositories data`(){

        //when
        val entities = testEntityRepository.findAll()

        //then
        entities.size `should be equal to` 4
        entities[0].child `should not be` null
        entities[1].child `should not be` null
        entities[2].child `should not be` null
        entities[3].child `should be` null
    }

    @Test
    fun `test eq operator`(){

        //when
        var result = performGet("/testEntities?name=test_first")
        //then
        result
//                .andDo(print())
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())

        //when
        result = performGet("/testEntities?child.type=JAVA")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())

        //when
        result = performGet("/testEntities?child.num=0")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())
    }

    @Test
    fun `test gt operator`() {

        //when
        var result = performGet("/testEntities?float:gt=2.5")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity3.name}')]").exists())

        //when
        result = performGet("/testEntities?child.num:gt=2")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity3.name}')]").exists())
    }

    @Test
    fun `test lt operator`() {

        //when
        var result = performGet("/testEntities?float:lt=2.5")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())

        //when
        result = performGet("/testEntities?child.num:lt=3")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(2))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity2.name}')]").exists())
    }

    @Test
    fun `test goe operator`() {

        //when
        var result = performGet("/testEntities?float:goe=3.5")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity3.name}')]").exists())

        //when
        result = performGet("/testEntities?child.num:goe=3")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity3.name}')]").exists())
    }

    @Test
    fun `test loe operator`() {

        //when
        var result = performGet("/testEntities?float:loe=2.5")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(2))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity2.name}')]").exists())

        //when
        result = performGet("/testEntities?child.num:loe=2")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(2))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity2.name}')]").exists())
    }

    @Test
    fun `test contains operator`() {

        //when
        var result = performGet("/testEntities?name:contains=test")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(3))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity2.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity3.name}')]").exists())

        //when
        result = performGet("/testEntities?name:contains=fourth")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity4.name}')]").exists())
    }

    @Test
    fun `test startsWith operator`() {

        //when
        var result = performGet("/testEntities?name:startsWith=test")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(3))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity2.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity3.name}')]").exists())

        //when
        result = performGet("/testEntities?name:startsWith=fourth")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity4.name}')]").exists())
    }

    @Test
    fun `test isNull operator`() {

        //when
        var result = performGet("/testEntities?child:isNull")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity4.name}')]").exists())

        //when
        result = performGet("/testEntities?date:isNull")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())

        //when
        result = performGet("/testEntities?float:isNull")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity4.name}')]").exists())
    }

    @Test
    fun `test isNotNull operator`() {

        //when
        var result = performGet("/testEntities?child:isNotNull")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(3))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity2.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity3.name}')]").exists())

        //when
        result = performGet("/testEntities?date:isNotNull")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(3))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity2.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity3.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity4.name}')]").exists())

        //when
        result = performGet("/testEntities?float:isNotNull")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(3))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity2.name}')]").exists())
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity3.name}')]").exists())
    }

    @Test
    fun `test dloe operator`() {

        val date = LocalDate.now().plusDays(1)

        //when
        var result = performGet("/testEntities?date:dloe=$date")
        //then
        result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())

        //when
//        result = performGet("/testEntities?date:isNull")
//        //then
//        result
//                .andExpect(status().isOk)
//                .andExpect(jsonPath("$.page.totalElements").value(1))
//                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity.name}')]").exists())
//
//        //when
//        result = performGet("/testEntities?float:isNull")
//        //then
//        result
//                .andExpect(status().isOk)
//                .andExpect(jsonPath("$.page.totalElements").value(1))
//                .andExpect(jsonPath("$._embedded.testEntities[?(@.name == '${testEntity4.name}')]").exists())
    }

    private fun performGet(query: String) : ResultActions {
        return mvc.perform(get(query).accept(MediaType.APPLICATION_JSON))
    }
}