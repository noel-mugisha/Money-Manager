package com.moneymanager.backend.controllers;

import com.moneymanager.backend.dto.ExpenseDto;
import com.moneymanager.backend.dto.response.MessageResponse;
import com.moneymanager.backend.services.ExpenseService;
import com.moneymanager.backend.utils.ExcelService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseService expenseService;
    private final ExcelService excelService;

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

    @GetMapping("/excel/download")
    public void downloadIncomeExcel (HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=Expense_details.xlsx");
        excelService.writeExpensesToExcel(response.getOutputStream(), expenseService.getMonthlyExpenses());
    }

    @GetMapping("/email/send")
    public ResponseEntity<MessageResponse> emailExpenseDetails () throws MessagingException, IOException {
        var response = expenseService.emailExpenseDetails();
        return ResponseEntity.ok(response);
    }
}
