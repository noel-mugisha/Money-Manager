package com.moneymanager.backend.mappers;

import com.moneymanager.backend.dto.CategoryDto;
import com.moneymanager.backend.models.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(target = "userId", source = "user.id")
    CategoryDto toDto(Category category);

    Category toEntity(CategoryDto categoryDto);
}
