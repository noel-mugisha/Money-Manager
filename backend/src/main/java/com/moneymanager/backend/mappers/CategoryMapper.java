package com.moneymanager.backend.mappers;

import com.moneymanager.backend.dto.CategoryDto;
import com.moneymanager.backend.models.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface CategoryMapper {
    @Mapping(target = "userId", source = "user.id")
    CategoryDto toDto(Category category);

    Category toEntity(CategoryDto categoryDto);

    void updateCategory(@MappingTarget Category category, CategoryDto categoryDto);
}
