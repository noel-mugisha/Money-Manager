package com.moneymanager.backend.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record RecentTransactionDto(
        UUID id,
        UUID userId,
        String icon,
        String name,
        String type,
        BigDecimal amount,
        LocalDate date,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
