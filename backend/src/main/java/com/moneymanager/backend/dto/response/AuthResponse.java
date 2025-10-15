package com.moneymanager.backend.dto.response;

public record AuthResponse (
        String accessToken,
        String refreshToken
) {}
