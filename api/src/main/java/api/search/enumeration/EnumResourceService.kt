package api.search.enumeration

interface EnumResourceService {

    fun getEnumResource(name: String) : List<Pair<String, String>>

}
