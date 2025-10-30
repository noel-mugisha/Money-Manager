package com.moneymanager.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record ExpenseDto(
        UUID id,
        @NotBlank(message = "Name is required")
        String name,
        @NotNull(message = "Amount is required")
        @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
        BigDecimal amount,
        @NotNull(message = "Category ID is required")
        UUID categoryId,
        String categoryName,
        String icon,
        LocalDate date,
        UUID userId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {}
