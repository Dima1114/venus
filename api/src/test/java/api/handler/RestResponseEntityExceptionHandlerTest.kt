package api.handler

import api.exception.ResourceNotFoundException
import api.security.model.ErrorResponse
import org.amshove.kluent.`should be equal to`
import org.amshove.kluent.shouldEqual
import org.junit.Test
import org.springframework.data.rest.core.RepositoryConstraintViolationException
import org.springframework.http.HttpStatus
import org.springframework.mock.web.MockHttpServletRequest
import org.springframework.validation.BeanPropertyBindingResult
import org.springframework.web.context.request.ServletWebRequest

class RestResponseEntityExceptionHandlerTest {

    private val testSubject = RestResponseEntityExceptionHandler()

    @Test
    fun `should return map of field errors`() {
        //given
        val errors = BeanPropertyBindingResult(object { val name = ""; val value = "" }, "testObject")
        errors.rejectValue("name", "error", "empty")
        errors.rejectValue("value", "error", "empty")

        val exception = RepositoryConstraintViolationException(errors)

        //when
        val result = testSubject.handleRepositoryException(exception, ServletWebRequest(MockHttpServletRequest()))

        //then
        result.statusCode shouldEqual HttpStatus.BAD_REQUEST
        @Suppress("UNCHECKED_CAST")
        (result.body as Map<String, List<Any>>)["errors"]!!.size `should be equal to` 2
    }

    @Test
    fun `should return not found status`() {

        //when
        val result = testSubject.handleNotFoundException(ResourceNotFoundException("Not found"), ServletWebRequest(MockHttpServletRequest()))

        //then
        result.statusCode shouldEqual HttpStatus.NOT_FOUND
        (result.body as ErrorResponse).message!! `should be equal to` "Not found"
    }
}