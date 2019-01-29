package api.search.enumeration

import org.reflections.Reflections
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.lang.IllegalArgumentException

@Service
class EnumResourceServiceImpl(
        @Value("\${reflection.enum.root-path}") private val rootPackage: String? = null)
    : EnumResourceService {
    override fun getEnumResource(name: String, packageName: String): List<Map<String, String>> {
        val className = name.capitalize()

        return Reflections(packageName).getTypesAnnotatedWith(EnumResource::class.java)
                .asSequence()
                .filter { it.isEnum }
                .filter { it.simpleName == className }
                .flatMap { it.enumConstants.asSequence() }
                .map { mapOf("name" to (it as Enum<*>).name) }
                .toList()
    }

    override fun getEnumResource(name: String): List<Map<String, String>> {
        rootPackage
                ?: throw IllegalArgumentException("specify root package name as 'reflection.enum.root-path' in your property file")

        return getEnumResource(name, rootPackage)
    }
}
