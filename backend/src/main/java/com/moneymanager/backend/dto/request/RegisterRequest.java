package com.moneymanager.backend.dto.request;

import com.moneymanager.backend.validation.LowerCase;
import com.moneymanager.backend.validation.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
        @NotBlank(message = "Full names are required")
        String fullName,
        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        @LowerCase(message = "Email must be lowercase")
        String email,
        @NotBlank(message = "Password is required")
        @Password
        String password,
        String profileImageUrl) {}
