package com.moneymanager.backend.services;

import com.moneymanager.backend.dto.CategoryDto;
import com.moneymanager.backend.exceptions.ResourceAlreadyExistsException;
import com.moneymanager.backend.mappers.CategoryMapper;
import com.moneymanager.backend.repositories.CategoryRepository;
import com.moneymanager.backend.utils.AuthenticationFacadeImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final AuthenticationFacadeImpl authenticationFacadeImpl;

    public CategoryDto saveCategory(CategoryDto request) {
        var currentUser = authenticationFacadeImpl.getCurrentUser();
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
}
