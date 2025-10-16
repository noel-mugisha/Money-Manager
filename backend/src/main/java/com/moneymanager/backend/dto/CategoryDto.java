package com.moneymanager.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record CategoryDto(
        UUID id,
        @NotBlank(message = "Name should be provided")
        String name,
        @NotBlank(message = "Type should be provided")
        String type,
        String icon,
        UUID userId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
