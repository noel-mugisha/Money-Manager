package com.moneymanager.backend.mappers;

import com.moneymanager.backend.dto.ExpenseDto;
import com.moneymanager.backend.models.Expense;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ExpenseMapper {
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "categoryName", source = "category.name")
    ExpenseDto toDto(Expense expense);

    Expense toEntity(ExpenseDto expenseDto);

    void updateExpense(@MappingTarget Expense expense, ExpenseDto expenseDto);
}
