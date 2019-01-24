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

enum class SearchOperator private constructor(val operator: String,
                                              val predicate: (booleanBuilder: BooleanBuilder,
                                                              pathBuilder: PathBuilder<*>,
                                                              propertyPath: String,
                                                              values: MutableList<String>,
                                                              fieldType: Class<*>) -> Unit) {

    EQUAL("eq", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        val conversionService = DefaultConversionService()
        if (conversionService.canConvert(stringClass, fieldType)) {
            val typedValue = conversionService.convert(value[0], fieldType)
            booleanBuilder.and(pathBuilder.get(propertyPath).eq(typedValue))
        } else {
            booleanBuilder.and(pathBuilder.get(propertyPath).eq(fieldType))
        }
    }),

    GT("gt", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        val conversionService = DefaultConversionService()
        value.forEach {
            when(fieldType){
                longClass, integerClass -> {
                    val typedValue = conversionService.convert(it, longClass)
                    booleanBuilder.and(pathBuilder.getNumber(propertyPath, longClass).gt(typedValue))}
                doubleClass, floatClass -> {
                    val typedValue = conversionService.convert(it, doubleClass)
                    booleanBuilder.and(pathBuilder.getNumber(propertyPath, doubleClass).gt(typedValue))
                }
            }
        }
    }),

    LT("lt", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        val conversionService = DefaultConversionService()
        value.forEach {
            if (fieldType == longClass || fieldType == integerClass) {
                val typedValue = conversionService.convert(it, longClass)
                booleanBuilder.and(pathBuilder.getNumber(propertyPath, longClass).lt(typedValue))
            } else if (fieldType == doubleClass || fieldType == floatClass) {
                val typedValue = conversionService.convert(it, doubleClass)
                booleanBuilder.and(pathBuilder.getNumber(propertyPath, doubleClass).lt(typedValue))
            }
        }
    }),

    GOE("goe", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        val conversionService = DefaultConversionService()
        for (item in value) {
            if (fieldType == Long::class.java || fieldType == integerClass) {
                val typedValue = conversionService.convert(item, Long::class.java)
                booleanBuilder.and(pathBuilder.getNumber(propertyPath, Long::class.java).goe(typedValue))
            } else if (fieldType == doubleClass || fieldType == floatClass) {
                val typedValue = conversionService.convert(item, doubleClass)
                booleanBuilder.and(pathBuilder.getNumber(propertyPath, doubleClass).goe(typedValue))
            }
        }
    }),

    LOE("loe", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        val conversionService = DefaultConversionService()
        for (item in value) {
            if (fieldType == Long::class.java || fieldType == integerClass) {
                val typedValue = conversionService.convert(item, Long::class.java)
                booleanBuilder.and(pathBuilder.getNumber(propertyPath, Long::class.java).loe(typedValue))
            } else if (fieldType == doubleClass || fieldType == floatClass) {
                val typedValue = conversionService.convert(item, doubleClass)
                booleanBuilder.and(pathBuilder.getNumber(propertyPath, doubleClass).loe(typedValue))
            }
        }
    }),

    CONTAINS("contains", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        for (item in value) {
            booleanBuilder.and(pathBuilder.getString(propertyPath).containsIgnoreCase(item))
        }
    }),
    STARTS_WITH("startsWith", { booleanBuilder, pathBuilder, propertyPath, value, fieldType -> booleanBuilder.and(pathBuilder.getString(propertyPath).startsWith(value.get(0) as String)) }

    ),
    IS_NULL("isNull", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        value.add("")
        booleanBuilder.and(pathBuilder.get(propertyPath).isNull)
    }),
    IS_NOT_NULL("isNotNull", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        value.add("")
        booleanBuilder.and(pathBuilder.get(propertyPath).isNotNull)
    }),
    DATE_LESS_OR_EQUAL("dloe", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        if (fieldType == localDateClass) {
            booleanBuilder.and(pathBuilder.getDate(propertyPath, localDateClass)
                    .loe(LocalDate.parse(value.get(0))))
        } else if (fieldType == LocalDateTime::class.java) {
            booleanBuilder.and(pathBuilder.getDate(propertyPath, LocalDateTime::class.java)
                    .loe(LocalDateTime.parse(value.get(0), DateTimeFormatter.ISO_LOCAL_DATE)))
        }
    }),
    DATE_GREATER_OR_EQUAL("dgoe", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        if (fieldType == localDateClass) {
            booleanBuilder.and(pathBuilder.getDate(propertyPath, localDateClass)
                    .goe(LocalDate.parse(value.get(0))))
        } else if (fieldType == LocalDateTime::class.java) {
            booleanBuilder.and(pathBuilder.getDate(propertyPath, LocalDateTime::class.java)
                    .goe(LocalDateTime.parse(value.get(0), DateTimeFormatter.ISO_LOCAL_DATE)))
        }
    }),
    DATE_EQUAL("deq", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
        if (fieldType == localDateClass) {
            booleanBuilder.and(pathBuilder.getDate(propertyPath, localDateClass)
                    .eq(LocalDate.parse(value.get(0))))
        } else if (fieldType == LocalDateTime::class.java) {
            booleanBuilder.and(pathBuilder.getDate(propertyPath, LocalDateTime::class.java)
                    .eq(LocalDateTime.parse(value.get(0))))
        }
    }),
    IN("in", { booleanBuilder, pathBuilder, propertyPath, value, fieldType ->
//        if (fieldType.isEnum) {
//            booleanBuilder
//                    .and(pathBuilder.get(propertyPath)
//                            .`in`(*value
//                                    .map{ enum ->  read(fieldType.asSubclass(Enum::class.java), enum ) }
//                                    .toTypedArray()
//                            )
//                    )
//        } else if (Long::class.java.isAssignableFrom(fieldType)) {
//            booleanBuilder
//                    .and(pathBuilder.get(propertyPath)
//                            .`in`(*value.stream()
//                                    .map<Long>(Function<String, Long> { java.lang.Long.valueOf(it) })
//                                    .toArray()
//                            )
//                    )
//        } else {
//            booleanBuilder.and(pathBuilder.get(propertyPath).`in`(value))
//        }
    });

    companion object {

        val stringClass = String::class.java
        val longClass = Long::class.java
        val integerClass = Integer::class.java
        val doubleClass = Double::class.java
        val floatClass = Float::class.java
        val localDateClass = LocalDate::class.java
        
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

fun <T : Enum<T>> read(type: Class<T>, value: String): T {
    return java.lang.Enum.valueOf(type, value)
}