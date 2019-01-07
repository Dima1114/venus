//package api.security.login;
//
//import api.security.model.JwtUserDetails;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.web.WebAttributes;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//
//import api.security.service.*;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.Map;
//
//@Component
//public class JwtAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
//    private static Logger authLogger = LoggerFactory.getLogger("authLogger");
//
//    private JwtTokenService jwtTokenService;
//
//    public JwtAuthenticationSuccessHandler(JwtTokenService jwtTokenService) {
//        this.jwtTokenService = jwtTokenService;
//    }
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//                                        Authentication authentication) throws IOException, ServletException {
//        JwtUserDetails userDetails = (JwtUserDetails) authentication.getPrincipal();
//
//        String accessToken = jwtTokenService.generateAccessToken(userDetails);
//        String refreshToken = jwtTokenService.generateRefreshToken(userDetails);
//
//        jwtTokenService.updateRefreshToken(userDetails.getUsername(), refreshToken);
//
//        Map<String, String> tokenMap = new HashMap<>();
//        tokenMap.put("token", accessToken);
//        tokenMap.put("refreshToken", refreshToken);
//
//        response.setStatus(HttpStatus.OK.value());
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        new ObjectMapper().writeValue(response.getWriter(), tokenMap);
//
//        authLogger.info(userDetails.getUsername() + " - " + userDetails.getAuthorities());
//
//        clearAuthenticationAttributes(request);
//    }
//
//    /**
//     * Removes temporary authentication-related data which may have been stored
//     * in the session during the authentication process..
//     */
//    protected final void clearAuthenticationAttributes(HttpServletRequest request) {
//        HttpSession session = request.getSession(false);
//
//        if (session == null) {
//            return;
//        }
//
//        session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
//    }
//}