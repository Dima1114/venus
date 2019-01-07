package api.security.config;


import api.security.*;
import api.security.authorize.JwtAuthenticationProvider;
import api.security.authorize.JwtAuthenticationTokenFilter;
import api.security.authorize.JwtSuccessHandler;
import api.security.authorize.SkipPathAndMethodsRequestMatcher;
import api.security.exceptions.ErrorHandler;
import api.security.login.JwtLoginProvider;
import com.google.common.collect.ImmutableList;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true , securedEnabled = true)
public class JwtSecurityConfig extends WebSecurityConfigurerAdapter {

    public static final String TOKEN_ENTRY_POINT = "/auth/token";
    public static final String LOGIN_ENTRY_POINT = "/auth/login";
    public static final String ERROR_ENTRY_POINT = "/error";
    public static final String ENTRY_POINT = "/**";
    public static final String TOKEN_HEADER = "X-Auth";

    private JwtAuthenticationProvider authenticationProvider;
    private JwtAuthenticationEntryPoint entryPoint;
    private UserDetailsService userDetailsService;
    private ErrorHandler errorHandler;

    public JwtSecurityConfig(JwtAuthenticationProvider authenticationProvider,
                             JwtAuthenticationEntryPoint entryPoint,
                             UserDetailsService userDetailsService,
                             ErrorHandler errorHandler) {
        this.authenticationProvider = authenticationProvider;
        this.entryPoint = entryPoint;
        this.userDetailsService = userDetailsService;
        this.errorHandler = errorHandler;
    }

    @Bean
    public JwtLoginProvider jwtLoginProvider(){
        JwtLoginProvider jwtLoginProvider = new JwtLoginProvider();
        jwtLoginProvider.setEncoder(encoder());
        jwtLoginProvider.setUserDetailsService(userDetailsService);
        return jwtLoginProvider;
    }

    @Bean
    public BCryptPasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(){
        return new ProviderManager(Arrays.asList(jwtLoginProvider(), authenticationProvider));
    }

    @Bean
    public JwtAuthenticationTokenFilter authenticationTokenFilter(){

        List<String> pathsToSkip   = Arrays.asList(TOKEN_ENTRY_POINT, LOGIN_ENTRY_POINT, ERROR_ENTRY_POINT);
        List<String> methodsToSkip = Collections.singletonList(HttpMethod.OPTIONS.name());

        SkipPathAndMethodsRequestMatcher matcher
                = new SkipPathAndMethodsRequestMatcher(pathsToSkip, methodsToSkip, ENTRY_POINT);

        JwtAuthenticationTokenFilter filter = new JwtAuthenticationTokenFilter(matcher, errorHandler);
        filter.setAuthenticationManager(authenticationManager());
        filter.setAuthenticationSuccessHandler(new JwtSuccessHandler());

        return filter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
//                .antMatchers(HttpMethod.OPTIONS, ENTRY_POINT).permitAll()
                .antMatchers(TOKEN_ENTRY_POINT).permitAll()
                .antMatchers(LOGIN_ENTRY_POINT).permitAll()
                .and()
                .authorizeRequests().anyRequest().authenticated()
                .and()
                .exceptionHandling()
                    .accessDeniedHandler(errorHandler)
                    .authenticationEntryPoint(entryPoint)
                .and()
                .formLogin()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                .and().cors();
        http
//                .addFilterBefore(new CORSFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
        ;

        http.headers().cacheControl();
        http.requestCache().requestCache(getHttpSessionRequestCache());
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(ImmutableList.of("*"));
        configuration.setAllowedMethods(ImmutableList.of("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        // setAllowCredentials(true) is important, otherwise:
        // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*'
        // when the request's credentials mode is 'include'.
        configuration.setAllowCredentials(true);
        // setAllowedHeaders is important! Without it, OPTIONS preflight request
        // will fail with 403 Invalid CORS request
        configuration.setAllowedHeaders(ImmutableList.of("X-Auth", "Cache-Control", "Content-Type", "X-Requested-With"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private HttpSessionRequestCache getHttpSessionRequestCache() {
        HttpSessionRequestCache httpSessionRequestCache = new HttpSessionRequestCache();
        httpSessionRequestCache.setCreateSessionAllowed(false);
        return httpSessionRequestCache;
    }
}
