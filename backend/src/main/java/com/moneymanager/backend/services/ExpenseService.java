package com.moneymanager.backend.services;

import com.moneymanager.backend.dto.ExpenseDto;
import com.moneymanager.backend.exceptions.ResourceNotFoundException;
import com.moneymanager.backend.mappers.ExpenseMapper;
import com.moneymanager.backend.repositories.CategoryRepository;
import com.moneymanager.backend.repositories.ExpenseRepository;
import com.moneymanager.backend.utils.AuthenticationFacade;
import com.moneymanager.backend.utils.BaseTransactionService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class ExpenseService extends BaseTransactionService {
    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;

    public ExpenseService(
            AuthenticationFacade authenticationFacade,
            CategoryRepository categoryRepository,
            ExpenseRepository expenseRepository,
            ExpenseMapper expenseMapper
    ) {
        super(authenticationFacade, categoryRepository);

        this.expenseRepository = expenseRepository;
        this.expenseMapper = expenseMapper;
    }

    public ExpenseDto saveExpense(ExpenseDto request) {
        var user = getCurrentUser();
        var category = categoryRepository.findById(request.categoryId()).orElseThrow(
                () -> new ResourceNotFoundException("Category not found")
        );
        var expense = expenseMapper.toEntity(request);
        expense.setUser(user);
        expense.setCategory(category);
        var savedExpense = expenseRepository.save(expense);
        return expenseMapper.toDto(savedExpense);
    }

    public List<ExpenseDto> getMonthlyExpenses() {
        var user = getCurrentUser();
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.withDayOfMonth(1);
        LocalDate endDate = today.withDayOfMonth(today.lengthOfMonth());
        var expenses = expenseRepository.findByUserIdAndDateBetween(user.getId(), startDate, endDate);
        return expenses.stream().map(expenseMapper::toDto).toList();
    }

    public void deleteExpense(UUID expenseId) {
        var user = getCurrentUser();
        if (!expenseRepository.existsByIdAndUserId(expenseId, user.getId()))
            throw new ResourceNotFoundException("Expense with id: " + expenseId + " not found");
        expenseRepository.deleteById(expenseId);
    }

    public List<ExpenseDto> getLatest5expenses() {
        var user = getCurrentUser();
        var expenses = expenseRepository.findTop5ByUserIdOrderByDateDesc(user.getId());
        return expenses.stream().map(expenseMapper::toDto).toList();
    }

    public BigDecimal getTotalExpenses() {
        var user = getCurrentUser();
        BigDecimal totalExpenses = expenseRepository.findTotalExpensesByUserId(user.getId());
        // Check for null and return BigDecimal.ZERO if no expenses are found
        return totalExpenses != null ? totalExpenses : BigDecimal.ZERO;
    }

    public List<ExpenseDto> filterExpenses(LocalDate startDate, LocalDate endDate, String keyword, Sort sort) {
        var user = getCurrentUser();
        var incomes = expenseRepository.findByUserIdAndDateBetweenAndNameContainingIgnoreCase(
                user.getId(),
                startDate,
                endDate,
                keyword,
                sort
        );
        return incomes.stream().map(expenseMapper::toDto).toList();
    }

    // for notifications
    public List<ExpenseDto> getExpensesForDate(UUID userId, LocalDate date) {
        var list = expenseRepository.findByUserIdAndDate(userId, date);
        return list.stream().map(expenseMapper::toDto).toList();
    }
}
