package api.search.enumeration

interface EnumResourceService {

    fun getEnumResource(name: String) : List<Map<String, String>>
    fun getEnumResource(name: String, packageName: String): List<Map<String, String>>
}
