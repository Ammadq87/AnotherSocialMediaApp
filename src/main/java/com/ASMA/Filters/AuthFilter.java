package com.ASMA.Filters;

import com.ASMA.Models.User;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
//@Order(1)
@WebFilter(urlPatterns = "/api/v1/*")
@Slf4j
public class AuthFilter implements Filter {

    private static final String LOGIN_ENDPOINT = "/login";
    private static final String REGISTER_ENDPOINT = "/register";

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        // Set CORS headers
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

        // does not create session if already exists
        HttpSession session = request.getSession(false);

        log.info("AuthFilter started...");
        boolean isRequestValid = applyFilter(request, session);

        log.info("isRequestValid: {}", isRequestValid);

        if (!isRequestValid) {response.sendError(401);}

        log.info("AuthFilter finished");
        filterChain.doFilter(request, response);
    }

    private boolean applyFilter(HttpServletRequest request, HttpSession session){
        log.info("Applying filter...");

        boolean shouldFilter = shouldApplyFilter(request);

        if (!shouldFilter) {
            return true;
        }

        String token = getTokenFromCookies(request.getCookies());

        log.info("Filter applied");
        return true;
        // return token != null && !JwtUtil.isTokenExpired(token) && !isSessionExpired(session);
    }

    private boolean isSessionExpired(HttpSession session) {
        if (session != null) {
            User user = ((User) session.getAttribute("user"));
            return user == null;
        }

        log.info("user session does not exist");
        return false;
    }

    private String getTokenFromCookies(Cookie[] cookies) {
        if (cookies == null) {
            return null;
        }

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("token")) {
                return cookie.getValue();
            }
        }
        return null;
    }

    private boolean shouldApplyFilter(HttpServletRequest req) {
        List<String> doNotFilterEndpoints = List.of(LOGIN_ENDPOINT, REGISTER_ENDPOINT);
        String path = req.getRequestURI();
        Optional<String> endpoint = doNotFilterEndpoints.stream().filter(path::contains).findFirst();
        return endpoint.isEmpty();
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
