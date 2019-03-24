package api.validation

import api.entity.TestEntity
import api.integration.AbstractTestMvcIntegration
import api.repository.TestEntityRepository
import org.junit.After
import org.junit.Before
import org.junit.FixMethodOrder
import org.junit.Test
import org.junit.runners.MethodSorters
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.ResultActions
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultHandlers
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.TransactionDefinition.PROPAGATION_REQUIRES_NEW
import org.springframework.transaction.support.DefaultTransactionDefinition

@FixMethodOrder(MethodSorters.JVM)
class UniqueValidatorTest : AbstractTestMvcIntegration() {

    @Autowired
    lateinit var testEntityRepository: TestEntityRepository
    @Autowired
    lateinit var transactionManager: PlatformTransactionManager

    @Before
    fun setUp() {
        val status = transactionManager.getTransaction(DefaultTransactionDefinition(PROPAGATION_REQUIRES_NEW))
        testEntityRepository.save(TestEntity(name = "test1"))
        transactionManager.commit(status)
    }

    @After
    fun cleanUp(){
        val status = transactionManager.getTransaction(DefaultTransactionDefinition(PROPAGATION_REQUIRES_NEW))
        testEntityRepository.deleteAll()
        transactionManager.commit(status)
    }

    @Test
    fun `should save entity`() {

        //when
//        val result = testEntityRepository.save(TestEntity(name = "test1"))
//        performPost("/testEntities", """{"name": "test1"}""")
        val result = performPost("/testEntities", """{"name": "test1"}""")

        //then
        result.andDo(MockMvcResultHandlers.print())
//        result.username `should equal` "test1"
//        result.name `should equal` "test1"

    }

    private fun performPost(query: String, body: String): ResultActions {
        return mvc.perform(MockMvcRequestBuilders.post(query)
                .content(body)
                .accept(MediaType.APPLICATION_JSON))
    }
}