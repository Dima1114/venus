package api.handler

import api.exception.ResourceNotFoundException
import api.security.model.ErrorResponse
import com.nhaarman.mockito_kotlin.whenever
import org.amshove.kluent.`should be equal to`
import org.amshove.kluent.mock
import org.amshove.kluent.shouldEqual
import org.hibernate.validator.internal.engine.ConstraintViolationImpl
import org.junit.Test
import org.springframework.data.rest.core.RepositoryConstraintViolationException
import org.springframework.http.HttpStatus
import org.springframework.mock.web.MockHttpServletRequest
import org.springframework.validation.BeanPropertyBindingResult
import org.springframework.web.context.request.ServletWebRequest
import javax.validation.ConstraintViolationException
import javax.validation.Path

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
        (result.body as Map<String, List<Any>>).getValue("errors").size `should be equal to` 2
    }

    @Test
    fun `should return not found status`() {

        //when
        val result = testSubject.handleNotFoundException(
                ResourceNotFoundException("Not found"),
                ServletWebRequest(MockHttpServletRequest()))

        //then
        result.statusCode shouldEqual HttpStatus.NOT_FOUND
        (result.body as ErrorResponse).message!! `should be equal to` "Not found"
    }

    @Test
    fun `should return map of constraint errors`() {
        //given
        val exception = ConstraintViolationException(setOf(getConstraint("name", "error", "empty")))

        //when
        val result = testSubject.handleConstraintException(exception, ServletWebRequest(MockHttpServletRequest()))

        //then
        result.statusCode shouldEqual HttpStatus.BAD_REQUEST
        @Suppress("UNCHECKED_CAST")
        (result.body as Map<String, List<Any>>).getValue("errors").size `should be equal to` 1
    }

    private fun getConstraint(entity: Any, path: String, message: String): ConstraintViolationImpl<*> {

        val constraintMock = mock(ConstraintViolationImpl::class)
        val pathMock = mock(Path::class)

        whenever(pathMock.toString()).thenReturn(path)
        whenever(constraintMock.messageTemplate).thenReturn(message)
        whenever(constraintMock.rootBean).thenReturn(entity)
        whenever(constraintMock.propertyPath).thenReturn(pathMock)

        return constraintMock
    }
}