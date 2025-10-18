package com.moneymanager.backend.dto;

import java.time.LocalDate;

public record FilterDto(
        String type,
        LocalDate startDate,
        LocalDate endDate,
        String keyword,
        String sortField, // date, amount, name
        String sortOrder // asc or desc
) {
}
