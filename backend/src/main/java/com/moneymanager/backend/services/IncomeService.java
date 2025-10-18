package com.moneymanager.backend.services;

import com.moneymanager.backend.dto.IncomeDto;
import com.moneymanager.backend.exceptions.ResourceNotFoundException;
import com.moneymanager.backend.mappers.IncomeMapper;
import com.moneymanager.backend.repositories.CategoryRepository;
import com.moneymanager.backend.repositories.IncomeRepository;
import com.moneymanager.backend.utils.AuthenticationFacade;
import com.moneymanager.backend.utils.BaseTransactionService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class IncomeService extends BaseTransactionService {
    private final IncomeRepository incomeRepository;
    private final IncomeMapper incomeMapper;

    public IncomeService(
            AuthenticationFacade authenticationFacade,
            CategoryRepository categoryRepository,
            IncomeRepository incomeRepository,
            IncomeMapper incomeMapper
    ) {
        super(authenticationFacade, categoryRepository);
        this.incomeRepository = incomeRepository;
        this.incomeMapper = incomeMapper;
    }

    public IncomeDto saveIncome(IncomeDto request) {
        var user = getCurrentUser();
        var category = categoryRepository.findById(request.categoryId()).orElseThrow(
                () -> new ResourceNotFoundException("Category Not Found")
        );
        var income = incomeMapper.toEntity(request);
        income.setUser(user);
        income.setCategory(category);
        var savedIncome = incomeRepository.save(income);
        return incomeMapper.toDto(savedIncome);
    }

    public List<IncomeDto> getMonthlyIncomes() {
        var user = getCurrentUser();
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.withDayOfMonth(1);
        LocalDate endDate = today.withDayOfMonth(today.lengthOfMonth());
        var incomes = incomeRepository.findByUserIdAndDateBetween(user.getId(), startDate, endDate);
        return incomes.stream().map(incomeMapper::toDto).toList();
    }

    public void deleteIncome(UUID incomeId) {
        var user = getCurrentUser();
        if (!incomeRepository.existsByIdAndUserId(incomeId, user.getId()))
            throw new ResourceNotFoundException("Income with id: " + incomeId + " not found");
        incomeRepository.deleteById(incomeId);
    }

    public List<IncomeDto> getLatest5Incomes() {
        var user = getCurrentUser();
        var incomes = incomeRepository.findTop5ByUserIdOrderByDateDesc(user.getId());
        return incomes.stream().map(incomeMapper::toDto).toList();
    }

    public BigDecimal getTotalIncome() {
        var user = getCurrentUser();
        BigDecimal totalIncome = incomeRepository.findTotalIncomesByUserId(user.getId());
        // Check for null and return BigDecimal.ZERO if no expenses are found
        return totalIncome != null ? totalIncome : BigDecimal.ZERO;
    }

    public List<IncomeDto> filterIncomes(LocalDate startDate, LocalDate endDate, String keyword, Sort sort) {
        var user = getCurrentUser();
        var incomes = incomeRepository.findByUserIdAndDateBetweenAndNameContainingIgnoreCase(
                user.getId(),
                startDate,
                endDate,
                keyword,
                sort
        );
        return incomes.stream().map(incomeMapper::toDto).toList();
    }

    // for notifications
    public List<IncomeDto> getIncomesForDate (UUID userId, LocalDate date) {
        var list = incomeRepository.findByUserIdAndDate(userId, date);
        return list.stream().map(incomeMapper::toDto).toList();
    }
}
