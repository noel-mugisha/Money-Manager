package com.moneymanager.backend.dto.response;

import com.moneymanager.backend.dto.UserDto;

public record AuthResponse (
        String accessToken,
        String refreshToken,
        UserDto user
) {}
