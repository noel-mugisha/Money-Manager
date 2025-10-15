package com.moneymanager.backend.services;

import com.moneymanager.backend.dto.request.RegisterRequest;
import com.moneymanager.backend.enums.Role;
import com.moneymanager.backend.exceptions.DuplicateEmailException;
import com.moneymanager.backend.mappers.UserMapper;
import com.moneymanager.backend.models.User;
import com.moneymanager.backend.repositories.UserRepository;
import com.moneymanager.backend.utils.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    @Value("${app.frotend-url}")
    private String frotendUrl;

    @Transactional
    public User registerUser(RegisterRequest request) {
        // activation token
        String activationToken = UUID.randomUUID().toString();

        //populate the user entity
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateEmailException("Email already exists");
        }
        var user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        user.setActivationToken(activationToken);

        // send the activation link
        sendActivationEmail(user.getEmail(), activationToken);
        // save the user in the database
        return userRepository.save(user);
    }

    private void sendActivationEmail(String email, String activationToken) {
        String subject = "Activate your Money Manager account";
        String activationUrl = frotendUrl + "/activate?token=" + activationToken;
        String body = "Click on the following link to activate your Money Manager account: " + activationUrl;
        emailService.sendEmail(email, subject, body);
    }
}
