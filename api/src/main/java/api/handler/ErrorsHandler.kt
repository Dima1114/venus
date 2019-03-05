package api.handler

import org.springframework.validation.Errors

fun getErrors(errors: Errors) : Map<String, Any> {
    val errorsMap = errors.fieldErrors
            .map {
                object {
                    val entity = it.objectName
                    val field = it.field
                    val rejectValue = it.rejectedValue
                    val defaultMessage = it.defaultMessage
                }
            }
    return mapOf("errors" to errorsMap)
}