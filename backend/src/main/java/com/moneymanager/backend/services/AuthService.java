package com.moneymanager.backend.services;

import com.moneymanager.backend.dto.request.RegisterRequest;
import com.moneymanager.backend.enums.Role;
import com.moneymanager.backend.exceptions.DuplicateEmailException;
import com.moneymanager.backend.mappers.UserMapper;
import com.moneymanager.backend.models.User;
import com.moneymanager.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateEmailException("Email already exists");
        }
        var user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        return userRepository.save(user);
    }
}
