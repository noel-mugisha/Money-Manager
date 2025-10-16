package com.moneymanager.backend.controllers;

import com.moneymanager.backend.dto.CategoryDto;
import com.moneymanager.backend.services.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryDto> addCategory(
            @Valid @RequestBody CategoryDto request,
            UriComponentsBuilder uriBuilder
    ) {
        var categoryDto = categoryService.saveCategory(request);
        var uri = uriBuilder.path("/{id}")
                .buildAndExpand(categoryDto.id()).toUri();
        return ResponseEntity.created(uri).body(categoryDto);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getCategories(
            @RequestParam(required = false) String type
    ) {
        List<CategoryDto> categories;
        if (type != null) {
            categories = categoryService.getCategoriesByType(type);
        } else {
            categories = categoryService.getCategoriesForCurrentUser();
        }
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> updateCategory(
            @PathVariable UUID id,
            @Valid @RequestBody CategoryDto request
    ) {
        var categoryDto = categoryService.updateCategory(id, request);
        return ResponseEntity.ok(categoryDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(
            @PathVariable UUID id
    ) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
