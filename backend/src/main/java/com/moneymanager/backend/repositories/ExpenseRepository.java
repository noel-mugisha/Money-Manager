package com.moneymanager.backend.repositories;

import com.moneymanager.backend.models.Expense;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface ExpenseRepository extends JpaRepository<Expense, UUID> {
    List<Expense> findByUserIdOrderByDateDesc(UUID userId);

    List<Expense> findTop5ByUserIdOrderByDateDesc(UUID userId);

    @Query("SELECT SUM (e.amount) FROM Expense e WHERE e.user.id = :userId")
    BigDecimal findTotalExpensesByUserId(UUID userId);

    List<Expense> findByUserIdAndDateBetweenAndNameContainingIgnoreCase(
            UUID userId, LocalDate startDate, LocalDate endDate, String keyword, Sort sort
    );

    List<Expense> findByUserIdAndDateBetween(UUID userId, LocalDate startDate, LocalDate endDate);

    Boolean existsByIdAndUserId(UUID id, UUID userId);
}
