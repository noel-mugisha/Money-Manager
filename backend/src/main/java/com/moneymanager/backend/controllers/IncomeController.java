package com.moneymanager.backend.controllers;

import com.moneymanager.backend.dto.IncomeDto;
import com.moneymanager.backend.dto.response.MessageResponse;
import com.moneymanager.backend.services.IncomeService;
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
@RequestMapping("/incomes")
@RequiredArgsConstructor
public class IncomeController {
    private final IncomeService incomeService;
    private final ExcelService excelService;

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

    @GetMapping("/excel/download")
    public void downloadIncomeExcel (HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=Income_details.xlsx");
        excelService.writeIncomesToExcel(response.getOutputStream(), incomeService.getMonthlyIncomes());
    }

    @GetMapping("/email/send")
    public ResponseEntity<MessageResponse> emailExpenseDetails () throws MessagingException, IOException {
        var response = incomeService.emailIncomeDetails();
        return ResponseEntity.ok(response);
    }

}
