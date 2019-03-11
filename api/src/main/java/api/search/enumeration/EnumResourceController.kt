package api.search.enumeration

import org.springframework.hateoas.Resources
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/enums")
class EnumResourceController(val enumResourceService: EnumResourceService) {

    @GetMapping("/{type}")
    fun getEnumsOfType(@PathVariable("type") type: String) : ResponseEntity<*>{

        val enums =  enumResourceService.getEnumResource(type)
        return ResponseEntity.ok(Resources(enums))
    }

}
