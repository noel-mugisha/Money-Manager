package com.moneymanager.backend.dto;

import java.util.UUID;

public record UserDto (
        UUID id ,
        String fullName,
        String email,
        String profileImageUrl,
        String role
) {}
