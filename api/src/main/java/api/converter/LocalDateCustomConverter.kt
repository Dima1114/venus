package api.converter

import org.springframework.boot.context.properties.ConfigurationPropertiesBinding
import org.springframework.core.convert.converter.Converter
import org.springframework.stereotype.Component
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException

@Component
@ConfigurationPropertiesBinding
class LocalDateCustomConverter : Converter<String, LocalDate> {

    override fun convert(source: String?): LocalDate? {

        return source?.let { tryParse(source) }
    }
}

fun tryParse(source: String?): LocalDate? {
    val patterns = listOf("MM-dd-yyyy", "MM/dd/yyyy", "yyyy-MM-dd", "yyyy/MM/dd")
    var result : LocalDate? = null
    patterns.forEach {
        try {
            result = LocalDate.parse(source, DateTimeFormatter.ofPattern(it))
            return@forEach
        } catch (ex: DateTimeParseException) { /*continue trying*/ }
    }
    return result
}