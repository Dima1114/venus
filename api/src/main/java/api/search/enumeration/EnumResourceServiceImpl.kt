package api.search.enumeration

import api.function.takeOrThrow
import api.security.exceptions.JwtAuthenticationException
import api.service.getUserFromContext
import org.reflections.Reflections
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.lang.IllegalArgumentException
import java.util.Collections

@Service
class EnumResourceServiceImpl(@Value("\${reflection.enum.root-path}") private val rootPackage: String? = null) : EnumResourceService {

    override fun getEnumResource(name: String, packageName: String): List<Map<String, String>> {
        val className = name.capitalize()

        val candidate = Reflections(packageName).getTypesAnnotatedWith(EnumResource::class.java)
                .asSequence()
                .filter { it.isEnum }
                .find { it.simpleName == className } ?: return emptyList()

        return candidate
                .takeOrThrow(::checkPermissions) { throw JwtAuthenticationException("You don`t have permission to access") }
                .enumConstants
                .map { mapOf("name" to (it as Enum<*>).name) }
                .toList()
    }

    override fun getEnumResource(name: String): List<Map<String, String>> {
        rootPackage ?: throw IllegalArgumentException(
                "specify root package name as 'reflection.enum.root-path' in your property file")

        return getEnumResource(name, rootPackage)
    }

    private fun checkPermissions(clazz: Class<*>): Boolean {

        val authorities = getUserFromContext()?.roles ?: return false
        val securedBy = clazz.getAnnotation(EnumResource::class.java).secured.toList()

        return !Collections.disjoint(authorities, securedBy)
    }
}
