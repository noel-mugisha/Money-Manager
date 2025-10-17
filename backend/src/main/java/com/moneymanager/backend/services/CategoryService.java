package com.moneymanager.backend.services;

import com.moneymanager.backend.dto.CategoryDto;
import com.moneymanager.backend.exceptions.ResourceAlreadyExistsException;
import com.moneymanager.backend.exceptions.ResourceNotFoundException;
import com.moneymanager.backend.mappers.CategoryMapper;
import com.moneymanager.backend.repositories.CategoryRepository;
import com.moneymanager.backend.utils.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final AuthenticationFacade authenticationFacade;

    public CategoryDto saveCategory(CategoryDto request) {
        var currentUser = authenticationFacade.getCurrentUser();
        // check if the category already exists for the user
        if (categoryRepository.existsByNameAndUserId(request.name(), currentUser.getId()))
            throw new ResourceAlreadyExistsException("Category with name " + request.name() + " already exists");
        // create a new category
        var newCategory = categoryMapper.toEntity(request);
        newCategory.setUser(currentUser);
        //save the category
        var savedCategory = categoryRepository.save(newCategory);
        return categoryMapper.toDto(savedCategory);
    }

    public List<CategoryDto> getCategoriesForCurrentUser() {
        var currentUser = authenticationFacade.getCurrentUser();
        var categories = categoryRepository.findByUserId(currentUser.getId());
        return categories.stream().map(categoryMapper::toDto).toList();
    }

    public List<CategoryDto> getCategoriesByType(String type) {
        var currentUser = authenticationFacade.getCurrentUser();
        var categories = categoryRepository.findByTypeAndUserId(type, currentUser.getId());
        return categories.stream().map(categoryMapper::toDto).toList();
    }

    public CategoryDto updateCategory(UUID id, CategoryDto request) {
        var currentUser = authenticationFacade.getCurrentUser();
        var existingCategory = categoryRepository.findByIdAndUserId(id, currentUser.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Category with id " + id + " not found")
        );
        categoryMapper.updateCategory(existingCategory, request);
        var savedCategory = categoryRepository.save(existingCategory);
        return categoryMapper.toDto(savedCategory);
    }

    public void deleteCategory(UUID id) {
        var currentUser = authenticationFacade.getCurrentUser();
        var existingCategory = categoryRepository.findByIdAndUserId(id, currentUser.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Category with id " + id + " not found")
        );
        categoryRepository.delete(existingCategory);
    }
}
