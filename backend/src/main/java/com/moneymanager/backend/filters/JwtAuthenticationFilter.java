package com.moneymanager.backend.filters;

import com.moneymanager.backend.security.CustomUserDetailsService;
import com.moneymanager.backend.security.jwt.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String bearerToken = request.getHeader("Authorization");
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        var jwt = bearerToken.substring(7);
        UUID userId = null;

        try {
            userId = jwtService.extractSubject(jwt);

            if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                var userDetails = userDetailsService.loadUserByUserId(userId);
                if (jwtService.isTokenValid(jwt, userId)) {
                    var authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (ExpiredJwtException ex) {
            logger.warn("JWT expired: " + ex.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            // Json error message to handle expired tokens
            String jsonError = "{\"statusCode\":401,\"errorReason\":\"Unauthorized\",\"message\":\"Your session has expired. Please log in again.\"}";
            response.getWriter().write(jsonError);

            return;
        } catch (Exception ex) {
            // Handle other JWT exceptions (e.g., malformed, invalid signature)
            logger.error("Other JWT exception: " + ex.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            String jsonError = "{\"statusCode\":401,\"errorReason\":\"Unauthorized\",\"message\":\"Invalid token.\"}";
            response.getWriter().write(jsonError);
            return;
        }
        filterChain.doFilter(request, response);
    }
}