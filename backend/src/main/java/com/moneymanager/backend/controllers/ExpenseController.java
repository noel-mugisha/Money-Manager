package com.moneymanager.backend.controllers;

import com.moneymanager.backend.dto.ExpenseDto;
import com.moneymanager.backend.services.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseDto> addExpense(
            @Valid @RequestBody ExpenseDto request,
            UriComponentsBuilder uriBuilder
    ) {
        var expenseDto = expenseService.saveExpense(request);
        var uri = uriBuilder.path("/expenses/{id}")
                .buildAndExpand(expenseDto.id()).toUri();
        return ResponseEntity.created(uri).body(expenseDto);
    }

    @GetMapping
    public ResponseEntity<List<ExpenseDto>> getExpenses() {
        var expenses = expenseService.getMonthlyExpenses();
        return ResponseEntity.ok().body(expenses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable UUID id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
