package com.moneymanager.backend.services;

import com.moneymanager.backend.dto.UserDto;
import com.moneymanager.backend.mappers.UserMapper;
import com.moneymanager.backend.utils.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final AuthenticationFacade authFacade;
    private final UserMapper userMapper;

    public UserDto getUserProfile() {
        var user = authFacade.getCurrentUser();
        if (user == null) {
            throw new RuntimeException("Unexpected error: user not found in context");
        }
        return userMapper.toDto(user);
    }
}
