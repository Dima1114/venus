package api.security.authorize;

import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

public class SkipPathAndMethodsRequestMatcher implements RequestMatcher {

    private List<String> methodsToSkip;
    private OrRequestMatcher matchers;
    private RequestMatcher processingMatcher;

    public SkipPathAndMethodsRequestMatcher(List<String> pathsToSkip, List<String> methodsToSkip, String processingPath) {

        List<RequestMatcher> m = pathsToSkip.stream().map(AntPathRequestMatcher::new).collect(Collectors.toList());

        this.matchers = new OrRequestMatcher(m);
        this.processingMatcher = new AntPathRequestMatcher(processingPath);
        this.methodsToSkip = methodsToSkip;
    }

    @Override
    public boolean matches(HttpServletRequest request) {

        if (matchers.matches(request)) {
            return false;
        }

        if (methodsToSkip.contains(request.getMethod())) {
            return false;
        }

        return processingMatcher.matches(request);
    }
}