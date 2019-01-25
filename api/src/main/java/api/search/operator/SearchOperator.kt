package api.search.operator

import com.querydsl.core.BooleanBuilder
import com.querydsl.core.types.dsl.PathBuilder
import org.springframework.core.convert.support.DefaultConversionService
import org.springframework.data.querydsl.binding.QuerydslBindings
import org.springframework.util.MultiValueMap

import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

enum class SearchOperator(val operator: String,
                          val predicate: (booleanBuilder: BooleanBuilder,
                                          pathBuilder: PathBuilder<*>,
                                          propertyPath: String,
                                          values: MutableList<String>,
                                          fieldType: Class<*>) -> Unit) {

    EQUAL("eq", { booleanBuilder, pathBuilder, propertyPath, value, _ ->
        booleanBuilder.and(pathBuilder.get(propertyPath).eq(value[0]))
    }),
    GT("gt", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        value.forEach {
            when(fieldType) {
                longClass, integerClass -> booleanBuilder.and(pathBuilder.getNumber(propertyPath, longClass).gt(it.toLong()))
                doubleClass, floatClass -> booleanBuilder.and(pathBuilder.getNumber(propertyPath, doubleClass).gt(it.toDouble()))
            }
        }
    }),
    LT("lt", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        value.forEach {
            when(fieldType){
                longClass, integerClass -> booleanBuilder.and(pathBuilder.getNumber(propertyPath, longClass).lt(it.toLong()))
                doubleClass, floatClass -> booleanBuilder.and(pathBuilder.getNumber(propertyPath, doubleClass).lt(it.toDouble()))
            }
        }
    }),
    GOE("goe", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        value.forEach {
            when(fieldType){
                longClass, integerClass -> booleanBuilder.and(pathBuilder.getNumber(propertyPath, longClass).goe(it.toLong()))
                doubleClass, floatClass -> booleanBuilder.and(pathBuilder.getNumber(propertyPath, doubleClass).goe(it.toDouble()))
            }
        }
    }),
    LOE("loe", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        value.forEach {
            when(fieldType){
                longClass, integerClass -> booleanBuilder.and(pathBuilder.getNumber(propertyPath, longClass).loe(it.toLong()))
                doubleClass, floatClass -> booleanBuilder.and(pathBuilder.getNumber(propertyPath, doubleClass).loe(it.toDouble()))
            }
        }
    }),
    CONTAINS("contains", { booleanBuilder, pathBuilder, propertyPath, value, _ ->
        value.forEach { booleanBuilder.and(pathBuilder.getString(propertyPath).containsIgnoreCase(it)) }
    }),
    STARTS_WITH("startsWith", { booleanBuilder, pathBuilder, propertyPath, value, _ -> booleanBuilder.and(pathBuilder.getString(propertyPath).startsWith(value[0])) }

    ),
    IS_NULL("isNull", { booleanBuilder, pathBuilder, propertyPath, value, _ ->
        value.add("")
        booleanBuilder.and(pathBuilder.get(propertyPath).isNull)
    }),
    IS_NOT_NULL("isNotNull", { booleanBuilder, pathBuilder, propertyPath, value, _ ->
        value.add("")//WTF!? I don`t know
        booleanBuilder.and(pathBuilder.get(propertyPath).isNotNull)
    }),
    DATE_LESS_OR_EQUAL("dloe", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        when(fieldType){
            localDateClass -> booleanBuilder.and(pathBuilder.getDate(propertyPath, localDateClass).loe(LocalDate.parse(value[0])))
            localDateTimeClass -> booleanBuilder.and(pathBuilder.getDate(propertyPath, localDateTimeClass).loe(LocalDateTime.parse(value[0], DateTimeFormatter.ISO_LOCAL_DATE)))
        }
    }),
    DATE_GREATER_OR_EQUAL("dgoe", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        when(fieldType){
            localDateClass -> booleanBuilder.and(pathBuilder.getDate(propertyPath, localDateClass).goe(LocalDate.parse(value[0])))
            localDateTimeClass -> booleanBuilder.and(pathBuilder.getDate(propertyPath, localDateTimeClass).goe(LocalDateTime.parse(value[0], DateTimeFormatter.ISO_LOCAL_DATE)))
        }
    }),
    DATE_EQUAL("deq", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        when(fieldType){
            localDateClass -> booleanBuilder.and(pathBuilder.getDate(propertyPath, localDateClass).eq(LocalDate.parse(value[0])))
            localDateTimeClass -> booleanBuilder.and(pathBuilder.getDate(propertyPath, localDateTimeClass).eq(LocalDateTime.parse(value[0], DateTimeFormatter.ISO_LOCAL_DATE)))
        }
    }),
    IN("in", { booleanBuilder, pathBuilder, propertyPath, values, fieldType ->
        when {
            fieldType.isEnum -> {
                val conversionService = DefaultConversionService()
                booleanBuilder.and(pathBuilder.get(propertyPath).`in`(
                        *values.map{conversionService.convert(it, fieldType)}.toTypedArray()))
            }
            fieldType == longClass -> booleanBuilder.and(pathBuilder.get(propertyPath).`in`(*values.map{ it.toLong() }.toTypedArray()))
            else -> booleanBuilder.and(pathBuilder.get(propertyPath).`in`(*values.toTypedArray()))
        }
    });

    companion object {

        val longClass = Long::class.java
        val integerClass = Integer::class.java
        val doubleClass = Double::class.java
        val floatClass = Float::class.java
        val localDateClass = LocalDate::class.java
        val localDateTimeClass = LocalDateTime::class.java

        fun handle(bindings: QuerydslBindings, pathBuilder: PathBuilder<*>, propertyPath: String, path: String,
                   map: MultiValueMap<String, String>, fieldType: Class<*>) {

            val fieldSearchCriteria = BooleanBuilder()
            val alias = map.keys.lastOrNull() ?: path

            // Loop by the criteria for the particular field
            map.filter { (_, value) -> value.isNotEmpty() }
                    .forEach { (key, value) ->

                        values().firstOrNull {
                            it.operator == getEntityOperator(key)
                        }?.let {
                            it.predicate.invoke(fieldSearchCriteria, pathBuilder, propertyPath, value, fieldType)
                        }

                        bindings.bind(pathBuilder.get(propertyPath)).withDefaultBinding()
                    }

            // Apply criteria for path
            fieldSearchCriteria.value?.let {
                bindings.bind(pathBuilder.get(propertyPath)).`as`(alias).all { _, _ -> Optional.of(it) }

            }
        }
    }
}