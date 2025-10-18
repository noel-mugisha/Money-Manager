package com.moneymanager.backend.services;

import com.moneymanager.backend.dto.request.AuthRequest;
import com.moneymanager.backend.dto.request.RegisterRequest;
import com.moneymanager.backend.dto.response.AuthResponse;
import com.moneymanager.backend.enums.Role;
import com.moneymanager.backend.exceptions.BadRequestException;
import com.moneymanager.backend.exceptions.DuplicateEmailException;
import com.moneymanager.backend.exceptions.ResourceNotFoundException;
import com.moneymanager.backend.mappers.UserMapper;
import com.moneymanager.backend.models.User;
import com.moneymanager.backend.repositories.UserRepository;
import com.moneymanager.backend.security.jwt.JwtService;
import com.moneymanager.backend.utils.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    @Value("${app.backend-url}")
    private String backendUrl;

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

    // helper method to send activation email
    private void sendActivationEmail(String email, String activationToken) {
        String subject = "Activate your Money Manager account";
        String activationUrl = backendUrl + "/api/v1/auth/activate?token=" + activationToken;
        String body = "Click on the following link to activate your Money Manager account: " + activationUrl;
        emailService.sendEmail(email, subject, body);
    }

    public void activateAccount(String token) {
        var user = userRepository.findByActivationToken(token).orElseThrow(
                () -> new ResourceNotFoundException("User this activation token not found " + token)
        );
        user.setIsActive(true);
        user.setActivationToken(null);
        userRepository.save(user);
    }

    public AuthResponse authenticate(AuthRequest request) {
        var user = userRepository.findByEmail(request.email()).orElseThrow();
        if (!user.getIsActive())
            throw new BadRequestException("Verify our email address!");
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        var accessToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        return new AuthResponse(accessToken, refreshToken);
    }

    public AuthResponse refreshTokens(String refreshToken) {
        UUID id = jwtService.extractSubject(refreshToken);
        var user = userRepository.findById(id).orElseThrow();
        var accessToken = jwtService.generateAccessToken(user);
        var newRefreshToken = jwtService.generateRefreshToken(user);
        return new AuthResponse(accessToken, newRefreshToken);
    }
}
