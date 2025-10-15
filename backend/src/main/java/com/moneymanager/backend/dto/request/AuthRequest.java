package com.moneymanager.backend.dto.request;

public record AuthRequest (
        String email,
        String password
) {}
