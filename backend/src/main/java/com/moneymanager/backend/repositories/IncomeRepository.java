package com.moneymanager.backend.repositories;

import com.moneymanager.backend.models.Income;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface IncomeRepository extends JpaRepository<Income, UUID> {
    List<Income> findByUserIdOrderByDateDesc(UUID userId);

    List<Income> findTop5ByUserIdOrderByDateDesc(UUID userId);

    @Query("SELECT SUM (i.amount) FROM Income i WHERE i.user.id = :userId")
    BigDecimal findTotalExpensesByUserId(UUID userId);

    List<Income> findByUserIdAndDateBetweenAndNameContainingIgnoreCase(
            UUID userId, LocalDate startDate, LocalDate endDate, String keyword, Sort sort
    );

    List<Income> findByUserIdAndDateBetween(UUID userId, LocalDate startDate, LocalDate endDate);
}
