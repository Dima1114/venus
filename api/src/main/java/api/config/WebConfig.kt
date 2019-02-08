package api.config

import api.converter.LocalDateCustomConverter
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.format.FormatterRegistry



//@Configuration
//class WebConfig : WebMvcConfigurer {
//
//    override fun addCorsMappings(registry: CorsRegistry?) {
//        registry!!.addMapping("/**")
//                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
//                .allowedOrigins("*")
//                .allowedHeaders("X-Requested-With, X-Auth, Content-Type")
//                .maxAge(3600)
//                .allowCredentials(true)
//                .exposedHeaders("Location")
//    }
//
//    override fun addFormatters(registry: FormatterRegistry) {
//        registry.addConverter(LocalDateCustomConverter())
//        registry.javaClass
//    }
//}
