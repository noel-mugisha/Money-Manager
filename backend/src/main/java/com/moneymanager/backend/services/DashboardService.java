package com.moneymanager.backend.services;

import com.moneymanager.backend.dto.RecentTransactionDto;
import com.moneymanager.backend.utils.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final AuthenticationFacade authenticationFacade;
    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    public Map<String, Object> getDashboardData() {
        var user = authenticationFacade.getCurrentUser();
        Map<String, Object> returnValue = new LinkedHashMap<>();
        var latestIncomes = incomeService.getLatest5Incomes();
        var latestExpenses = expenseService.getLatest5expenses();
        List<RecentTransactionDto> recentTransactions = Stream.concat(
                latestIncomes.stream().map(income ->
                        RecentTransactionDto.builder()
                                .id(income.id())
                                .userId(user.getId())
                                .icon(income.icon())
                                .name(income.name())
                                .amount(income.amount())
                                .date(income.date())
                                .createdAt(income.createdAt())
                                .updatedAt(income.updatedAt())
                                .type("income")
                                .build()),
                latestExpenses.stream().map(expense ->
                        RecentTransactionDto.builder()
                                .id(expense.id())
                                .userId(user.getId())
                                .icon(expense.icon())
                                .name(expense.name())
                                .amount(expense.amount())
                                .date(expense.date())
                                .createdAt(expense.createdAt())
                                .updatedAt(expense.updatedAt())
                                .type("expense")
                                .build())
        ).sorted((a, b) -> {
            int cmp = b.date().compareTo(a.date());
            if (cmp == 0 && a.createdAt() != null && b.createdAt() != null) {
                return b.createdAt().compareTo(a.createdAt());
            }
            return cmp;
        }).toList();

        returnValue.put("totalBalance", incomeService.getTotalIncome().subtract(expenseService.getTotalExpenses()));
        returnValue.put("totalIncome", incomeService.getTotalIncome());
        returnValue.put("totalExpenses", expenseService.getTotalExpenses());
        returnValue.put("recent5Expenses", latestExpenses);
        returnValue.put("recent5Incomes", latestIncomes);
        returnValue.put("recentTransactions", recentTransactions);

        return returnValue;
    }
}
