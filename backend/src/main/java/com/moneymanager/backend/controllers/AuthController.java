package com.moneymanager.backend.controllers;

import com.moneymanager.backend.dto.request.AuthRequest;
import com.moneymanager.backend.dto.request.RegisterRequest;
import com.moneymanager.backend.dto.response.AuthResponse;
import com.moneymanager.backend.dto.response.MessageResponse;
import com.moneymanager.backend.security.jwt.JwtConfig;
import com.moneymanager.backend.services.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URI;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtConfig jwtConfig;
    private final AuthService authService;
    @Value("${app.frontend-url}")
    private String frontendUrl;

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        var savedUser = authService.registerUser(request);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/users/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();
        var message = new MessageResponse("User registered successfully, check email for account activation!");
        return ResponseEntity.created(uri).body(message);
    }

    @GetMapping("/activate")
    public RedirectView activateAccount(@RequestParam String token) {
        RedirectView redirectView = new RedirectView();
        try {
            authService.activateAccount(token);
            // On success, redirect to the frontend with a success status
            redirectView.setUrl(frontendUrl + "/verify-email?status=success");
        } catch (Exception e) {
            // On failure, redirect with an error status and a message
            redirectView.setUrl(frontendUrl + "/verify-email?status=error&message=Invalid or expired token.");
        }
        return redirectView;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login (
            @RequestBody AuthRequest request,
            HttpServletResponse response
    ) {
        var authResponse = authService.authenticate(request);
        // generating and adding refresh token to a cookie
        var refreshTokenCookie = generateRefreshTokenCookie(authResponse.refreshToken());
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh (
            @CookieValue(value = "refreshToken") String refreshToken,
            HttpServletResponse response
    ) {
        var authResponse = authService.refreshTokens(refreshToken);
        // generating and adding refresh token to a cookie
        var refreshTokenCookie = generateRefreshTokenCookie(authResponse.refreshToken());
        response.addCookie(refreshTokenCookie);
        return ResponseEntity.ok(authResponse);
    }

    // helper method for generating a cookie
    private Cookie generateRefreshTokenCookie(String refreshToken) {
        var cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/api/v1/auth/refresh");
        cookie.setMaxAge(jwtConfig.getRefreshTokenExpiration().intValue());
        cookie.setSecure(true);
        return cookie;
    }

}
