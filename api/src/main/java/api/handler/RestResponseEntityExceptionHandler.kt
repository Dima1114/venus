package api.handler

import api.exception.ResourceNotFoundException
import api.security.model.ErrorResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.WebRequest
import org.springframework.data.rest.core.RepositoryConstraintViolationException
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus

@RestControllerAdvice
class RestResponseEntityExceptionHandler {

    @ExceptionHandler(RepositoryConstraintViolationException::class)
    fun handleRepositoryException(ex: RepositoryConstraintViolationException, request: WebRequest): ResponseEntity<Any> {

        val errors = ex.errors.fieldErrors
                .map {
                    object {
                        val entity = it.objectName
                        val property = it.field
                        val rejectValue = it.rejectedValue
                        val message = it.defaultMessage
                    }
                }

        return ResponseEntity(mapOf("errors" to errors), HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(ResourceNotFoundException::class)
    fun handleNotFoundException(exception: ResourceNotFoundException, request: WebRequest): ResponseEntity<Any> {
        val errorResponse = ErrorResponse(HttpStatus.NOT_FOUND, exception.message)
        return ResponseEntity(errorResponse, errorResponse.status)
    }
}