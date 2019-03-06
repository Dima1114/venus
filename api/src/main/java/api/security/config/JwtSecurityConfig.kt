package api.security.config


import api.security.JwtAuthenticationEntryPoint
import api.security.authorize.JwtAuthenticationProvider
import api.security.authorize.JwtAuthenticationTokenFilter
import api.security.authorize.JwtSuccessHandler
import api.security.authorize.SkipPathAndMethodsRequestMatcher
import api.security.exceptions.ErrorHandler
import api.security.login.JwtLoginProvider
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.savedrequest.HttpSessionRequestCache
import java.util.*

@Configuration
@EnableWebSecurity
class JwtSecurityConfig(private val authenticationProvider: JwtAuthenticationProvider,
                        private val entryPoint: JwtAuthenticationEntryPoint,
                        private val userDetailsService: UserDetailsService,
                        private val errorHandler: ErrorHandler) : WebSecurityConfigurerAdapter() {

    private val httpSessionRequestCache: HttpSessionRequestCache
        get() {
            val httpSessionRequestCache = HttpSessionRequestCache()
            httpSessionRequestCache.setCreateSessionAllowed(false)
            return httpSessionRequestCache
        }

    @Bean
    fun jwtLoginProvider(): JwtLoginProvider = JwtLoginProvider(userDetailsService, encoder())

    @Bean
    fun encoder(): BCryptPasswordEncoder = BCryptPasswordEncoder()

    @Bean
    public override fun authenticationManager(): AuthenticationManager = ProviderManager(listOf(jwtLoginProvider(), authenticationProvider))

    @Bean
    fun authenticationTokenFilter(): JwtAuthenticationTokenFilter {

        val pathsToSkip = Arrays.asList(LOGIN_ENTRY_POINT)
        val methodsToSkip = listOf(HttpMethod.OPTIONS.name)

        val matcher = SkipPathAndMethodsRequestMatcher(pathsToSkip, methodsToSkip, ENTRY_POINT)

        val filter = JwtAuthenticationTokenFilter(matcher, errorHandler)
        filter.setAuthenticationManager(authenticationManager())
        filter.setAuthenticationSuccessHandler(JwtSuccessHandler())

        return filter
    }

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers(TOKEN_ENTRY_POINT).permitAll()
                .antMatchers(LOGIN_ENTRY_POINT).permitAll()
                .and()
                .authorizeRequests().anyRequest().permitAll()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(errorHandler)
                .authenticationEntryPoint(entryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().cors()
        http
                .addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter::class.java)

        http.headers().cacheControl()
        http.requestCache().requestCache(httpSessionRequestCache)
    }

    //not necessary if use proxy in Web requests
//    @Bean
//    fun corsConfigurationSource(): CorsConfigurationSource {
//        val configuration = CorsConfiguration()
//        configuration.allowedOrigins = ImmutableList.of("*")
//        configuration.allowedMethods = ImmutableList.of("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
//        // setAllowCredentials(true) is important, otherwise:
//        // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*'
//        // when the request's credentials mode is 'include'.
//        configuration.allowCredentials = true
//        // setAllowedHeaders is important! Without it, OPTIONS preflight request
//        // will fail with 403 Invalid CORS request
//        configuration.allowedHeaders = ImmutableList.of("X-Auth", "Cache-Control", "Content-Type", "X-Requested-With")
//        val source = UrlBasedCorsConfigurationSource()
//        source.registerCorsConfiguration("/**", configuration)
//        return source
//    }

    companion object {

        const val TOKEN_ENTRY_POINT = "/auth/token"
        const val LOGIN_ENTRY_POINT = "/auth/login"
        const val ENTRY_POINT = "/**"
        const val TOKEN_HEADER = "X-Auth"
    }
}
