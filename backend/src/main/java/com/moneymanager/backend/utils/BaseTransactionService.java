package com.moneymanager.backend.utils;

import com.moneymanager.backend.models.User;
import com.moneymanager.backend.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class BaseTransactionService {
    protected final AuthenticationFacade authenticationFacade;
    protected final CategoryRepository categoryRepository;

    protected User getCurrentUser() {
        return authenticationFacade.getCurrentUser();
    }
}
