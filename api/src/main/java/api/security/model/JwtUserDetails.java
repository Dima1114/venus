package api.security.model;

import api.entity.Role;
import api.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

public class JwtUserDetails implements UserDetails {

    private Long id;
    private String username;
    private String password;
    private boolean isEnabled;
    private Set<Role> roles;
    private String refreshToken;

    public static JwtUserDetails create(User user){
        return new JwtUserDetails()
                .setAuthorities(user.getRoles())
                .setEnabled(user.isEnabled())
                .setId(user.getId())
                .setUsername(user.getUsername())
                .setPassword(user.getPassword())
                .setRefreshToken(user.getRefreshToken());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    public Long getId() {
        return id;
    }

    public JwtUserDetails setId(Long id) {
        this.id = id;
        return this;
    }

    public JwtUserDetails setUsername(String username) {
        this.username = username;
        return this;
    }

    public JwtUserDetails setPassword(String password) {
        this.password = password;
        return this;
    }

    public JwtUserDetails setEnabled(boolean enabled) {
        isEnabled = enabled;
        return this;
    }

    public JwtUserDetails setAuthorities(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public JwtUserDetails setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }
}
