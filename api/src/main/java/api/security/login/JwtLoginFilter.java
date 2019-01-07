//package api.security.login;
//
//import com.fasterxml.jackson.core.JsonParseException;
//import com.fasterxml.jackson.databind.JsonMappingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import api.security.exceptions.JwtAuthenticationException;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//public class JwtLoginFilter extends AbstractAuthenticationProcessingFilter {
//
//    private AuthenticationSuccessHandler successHandler;
//
//    public JwtLoginFilter(String defaultFilterProcessesUrl, AuthenticationSuccessHandler successHandler) {
//        super(defaultFilterProcessesUrl);
//        this.successHandler = successHandler;
//    }
//
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
//
//        if (!HttpMethod.POST.name().equals(request.getMethod())) {
//            if(logger.isDebugEnabled()) {
//                logger.debug("Authentication method not supported. Request method: " + request.getMethod());
//            }
//            throw new JwtAuthenticationException("Authentication method not supported");
//        }
//
//        Login login;
//        try {
//            login = new ObjectMapper().readValue(request.getReader(), Login.class);
//        } catch (JsonParseException | JsonMappingException ex) {
//            throw new JwtAuthenticationException(ex.getMessage());
//        }
//
//        if (login.getPassword().isEmpty() || login.getUsername().isEmpty()) {
//            throw new JwtAuthenticationException("Username or Password not provided");
//        }
//
//        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(login.getUsername(),
//                login.getPassword());
//
//        return this.getAuthenticationManager().authenticate(token);
//
//    }
//
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
//                                            Authentication authResult) throws IOException, ServletException {
//        successHandler.onAuthenticationSuccess(request, response, authResult);
//    }
//
//    @Override
//    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
//                                              AuthenticationException failed) throws IOException, ServletException {
//        super.unsuccessfulAuthentication(request, response, failed);
//    }
//
//    private static class Login{
//        private String username;
//        private String password;
//
//        public String getUsername() {
//            return username;
//        }
//
//        public Login setUsername(String username) {
//            this.username = username;
//            return this;
//        }
//
//        public String getPassword() {
//            return password;
//        }
//
//        public Login setPassword(String password) {
//            this.password = password;
//            return this;
//        }
//    }
//}
