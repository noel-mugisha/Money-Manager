package com.moneymanager.backend.controllers;

import com.moneymanager.backend.dto.FilterDto;
import com.moneymanager.backend.dto.response.MessageResponse;
import com.moneymanager.backend.services.ExpenseService;
import com.moneymanager.backend.services.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/filter")
@RequiredArgsConstructor
public class FilterController {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<?> filterTransactions(
            @RequestBody FilterDto request
    ) {
        // validation
        var startDate = request.startDate() != null ? request.startDate() : LocalDate.of(2025, 1, 1);
        var endDate = request.endDate() != null ? request.endDate() : LocalDate.now();
        var keyword = request.keyword() != null ? request.keyword() : "";
        var sortField = request.sortField() != null ? request.sortField() : "date";
        Sort.Direction direction = "desc".equalsIgnoreCase(request.sortOrder()) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortField);

        List<?> list = new ArrayList<>();
        // check if it is an income or expense type
        if (request.type().equalsIgnoreCase("income")) {
            list = incomeService.filterIncomes(startDate, endDate, keyword, sort);
            return ResponseEntity.ok().body(list);
        } else if (request.type().equalsIgnoreCase("expense")) {
            list = expenseService.filterExpenses(startDate, endDate, keyword, sort);
            return ResponseEntity.ok().body(list);
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("The type should be either income or expense"));
        }

    }
}
