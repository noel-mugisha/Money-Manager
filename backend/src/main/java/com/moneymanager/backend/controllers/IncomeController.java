package com.moneymanager.backend.controllers;

import com.moneymanager.backend.dto.IncomeDto;
import com.moneymanager.backend.services.IncomeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/incomes")
@RequiredArgsConstructor
public class IncomeController {
    private final IncomeService incomeService;

    @PostMapping
    public ResponseEntity<IncomeDto> addIncome(
            @Valid @RequestBody IncomeDto request,
            UriComponentsBuilder uriBuilder
    ) {
        var incomeDto = incomeService.saveIncome(request);
        var uri = uriBuilder.path("/incomes/{id}")
                .buildAndExpand(incomeDto.id()).toUri();
        return ResponseEntity.created(uri).body(incomeDto);
    }

    @GetMapping
    public ResponseEntity<List<IncomeDto>> getIncomes() {
        var incomes = incomeService.getMonthlyIncomes();
        return ResponseEntity.ok().body(incomes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable UUID id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }

}
