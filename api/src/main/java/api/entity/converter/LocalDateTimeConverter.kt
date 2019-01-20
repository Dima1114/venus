package api.entity.converter

import javax.persistence.AttributeConverter
import javax.persistence.Converter
import java.sql.Timestamp
import java.time.LocalDateTime

@Converter(autoApply = true)
class LocalDateTimeConverter : AttributeConverter<LocalDateTime, Timestamp> {
    override fun convertToDatabaseColumn(attribute: LocalDateTime?): Timestamp? {
        return if (attribute == null) null else Timestamp.valueOf(attribute)
    }

    override fun convertToEntityAttribute(dbData: Timestamp?): LocalDateTime? {
        return dbData?.toLocalDateTime()
    }
}
