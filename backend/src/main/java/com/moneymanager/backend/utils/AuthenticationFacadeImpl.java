package com.moneymanager.backend.utils;

import com.moneymanager.backend.exceptions.RequireLoginException;
import com.moneymanager.backend.exceptions.ResourceNotFoundException;
import com.moneymanager.backend.models.User;
import com.moneymanager.backend.repositories.UserRepository;
import com.moneymanager.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthenticationFacadeImpl implements AuthenticationFacade {
    private final UserRepository userRepository;

    @Override
    public User getCurrentUser() {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal.equals("anonymousUser")) {
            throw new RequireLoginException("Please login first");
        }
        var userDetails = (UserPrincipal) principal;
        return userRepository.findByEmail(userDetails.getUsername()).orElseThrow(
                () -> new ResourceNotFoundException("User not found!!")
        );
    }
}
