package com.moneymanager.backend.mappers;

import com.moneymanager.backend.dto.IncomeDto;
import com.moneymanager.backend.models.Income;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface IncomeMapper {
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "categoryId", source = "category.id")
    IncomeDto toDto(Income income);

    Income toEntity(IncomeDto incomeDto);

    void updateIncome(@MappingTarget Income income, IncomeDto incomeDto);
}
