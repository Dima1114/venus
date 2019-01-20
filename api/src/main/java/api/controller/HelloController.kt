package api.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("rest/hello")
class HelloController {

    @GetMapping
    fun hello(): ResponseEntity<*> = ResponseEntity("Hello World!", HttpStatus.OK)
}
