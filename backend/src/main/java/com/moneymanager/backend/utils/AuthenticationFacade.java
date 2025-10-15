package com.moneymanager.backend.utils;

import com.moneymanager.backend.models.User;

public interface AuthenticationFacade {
    User getCurrentUser();
}
