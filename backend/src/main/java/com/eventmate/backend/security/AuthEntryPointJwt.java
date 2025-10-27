package com.eventmate.backend.security;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        
        // Console mein error log karein
        System.err.println("Unauthorized error: " + authException.getMessage());
        
        // HTTP 401 (Unauthorized) response bhejta hai
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized. Please log in.");
    }
}
