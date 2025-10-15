package com.moneymanager.backend.controllers;

import com.moneymanager.backend.dto.request.RegisterRequest;
import com.moneymanager.backend.dto.response.MessageResponse;
import com.moneymanager.backend.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

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
    public ResponseEntity<MessageResponse> activateAccount(
            @RequestParam String token
    ) {
        authService.activateAccount(token);
        var message = new MessageResponse("Account activated successfully, You can now Login!");
        return ResponseEntity.ok(message);
    }

}
