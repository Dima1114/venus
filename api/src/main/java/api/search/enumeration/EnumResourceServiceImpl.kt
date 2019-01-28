package api.search.enumeration

import org.reflections.Reflections
import org.springframework.beans.factory.annotation.Value

class EnumResourceServiceImpl : EnumResourceService {

    @Value("\${reflection.root-path}")
    private val rootPackage: String? = null

    override fun getEnumResource(name: String): List<Pair<String, String>> {



        Reflections(rootPackage).getTypesAnnotatedWith(EnumResource::class.java)
                .asSequence()
                .filter { it.isEnum }
                .filter { it.isEnum }

        return listOf()
    }

    private fun getClassName(camelCaseName: String) : String{
        return camelCaseName.capitalize()
    }

}
