package api.security.model

import org.springframework.http.HttpStatus

import java.util.Date

class ErrorResponse(val status: HttpStatus, val message: String?, val timestamp: Date)
