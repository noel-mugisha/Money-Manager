package com.moneymanager.backend.repositories;

import com.moneymanager.backend.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    List<Category> findByUserId(UUID userId);

    Optional<Category> findByIdAndUserId(UUID id, UUID userId);

    List<Category> findByTypeAndUserId(String type, UUID userId);

    Boolean existsByNameAndUserId(String name, UUID userId);
}
