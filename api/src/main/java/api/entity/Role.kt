package api.entity

import org.springframework.security.core.GrantedAuthority

enum class Role : GrantedAuthority {

    ROLE_READ,
    ROLE_WRITE,
    ROLE_USER,
    ROLE_ADMIN
    ;

    override fun getAuthority(): String {
        return this.name
    }
}
