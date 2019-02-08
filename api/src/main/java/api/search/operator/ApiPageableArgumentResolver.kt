package api.search.operator

import org.springframework.data.rest.webmvc.json.JacksonMappingAwareSortTranslator
import org.springframework.data.rest.webmvc.json.MappingAwareDefaultedPageableArgumentResolver
import org.springframework.data.web.PageableHandlerMethodArgumentResolver

class ApiPageableArgumentResolver(sortTranslator: JacksonMappingAwareSortTranslator,
                                  pageableResolver: PageableHandlerMethodArgumentResolver)
    : MappingAwareDefaultedPageableArgumentResolver(sortTranslator, pageableResolver) {


}