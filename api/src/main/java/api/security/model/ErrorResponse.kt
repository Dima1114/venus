package api.security.model

import org.springframework.http.HttpStatus
import java.time.LocalDateTime

class ErrorResponse(val status: HttpStatus, val message: String?){

    val errorCode = status.value()
    val timestamp = LocalDateTime.now()

    constructor(exception: Exception?) :
            this(HttpStatus.INTERNAL_SERVER_ERROR, exception?.message)

}
