//package api.security;
//
//import javax.servlet.*;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//public class CORSFilter implements Filter {
//
//    @Override
//    public void init(FilterConfig filterConfig) throws ServletException {
//        //nothing to do
//    }
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse res, FilterChain chain) throws IOException, ServletException {
//        HttpServletResponse response          = (HttpServletResponse) res;
//
//        response.setHeader("Access-Control-Allow-Origin","*");
//        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PATCH, PUT");
//        response.setHeader("Access-Control-Max-Age", "3600");
//        response.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Auth, Content-Type");
//        response.setHeader("Access-Control-Expose-Headers", "Location");
//        response.setHeader("Access-Control-Allow-Credentials", "true");
//        chain.doFilter(request, response);
//    }
//
//    @Override
//    public void destroy() {
//        //nothing to do
//    }
//}