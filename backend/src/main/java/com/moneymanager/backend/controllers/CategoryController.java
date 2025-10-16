package com.moneymanager.backend.controllers;

import com.moneymanager.backend.dto.CategoryDto;
import com.moneymanager.backend.services.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

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
}
