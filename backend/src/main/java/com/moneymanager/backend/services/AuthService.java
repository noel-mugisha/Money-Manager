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
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
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

    private void sendActivationEmail(String email, String activationToken) {
        String subject = "Activate Your Money Manager Account";
        String activationUrl = backendUrl + "/api/v1/auth/activate?token=" + activationToken;

        try {
            String htmlContent = buildEmailTemplate(
                    "Welcome to Money Manager!",
                    "Thank you for signing up. Please click the button below to activate your account and start managing your finances.",
                    activationUrl,
                    "Activate Account"
            );
            emailService.sendHtmlEmail(email, subject, htmlContent);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send activation email", e);
        }
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
        var user = userRepository.findByEmail(request.email()).orElseThrow(
                () -> new BadCredentialsException("Invalid email or password")
        );
        if (!user.getIsActive())
            throw new BadRequestException("Verify our email address!");
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        var accessToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        var userDto = userMapper.toDto(user);
        return new AuthResponse(accessToken, refreshToken, userDto);
    }

    public AuthResponse refreshTokens(String refreshToken) {
        UUID id = jwtService.extractSubject(refreshToken);
        var user = userRepository.findById(id).orElseThrow();
        var accessToken = jwtService.generateAccessToken(user);
        var newRefreshToken = jwtService.generateRefreshToken(user);
        var userDto = userMapper.toDto(user);
        return new AuthResponse(accessToken, newRefreshToken, userDto);
    }

    private String buildEmailTemplate(String title, String body, String buttonUrl, String buttonText) {
        return "<!DOCTYPE html>"
                + "<html lang='en'>"
                + "<head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                + "<style> body { font-family: 'Outfit', sans-serif; } </style></head>"
                + "<body style='margin: 0; padding: 0; background-color: #fcfbfc;'>"
                + "  <table width='100%' border='0' cellspacing='0' cellpadding='0'>"
                + "    <tr><td align='center' style='padding: 20px 0;'>"
                + "      <table width='600' border='0' cellspacing='0' cellpadding='0' style='background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;'>"
                + "        <tr><td style='padding: 40px 20px 20px 20px;'>"
                + "          <h1 style='font-size: 24px; color: #333; font-weight: 600; text-align: center;'>" + title + "</h1>"
                + "          <p style='font-size: 16px; color: #555; line-height: 1.6; text-align: center; margin: 20px 0;'>" + body + "</p>"
                + "        </td></tr>"
                + "        <tr><td align='center' style='padding: 20px 40px 40px 40px;'>"
                + "          <a href='" + buttonUrl + "' style='display: inline-block; padding: 14px 28px; font-size: 16px; font-weight: 600; color: #ffffff; background-color: #581c87; text-decoration: none; border-radius: 8px;'>" + buttonText + "</a>"
                + "        </td></tr>"
                + "        <tr><td style='padding: 20px 40px; border-top: 1px solid #e2e8f0; text-align: center;'>"
                + "          <p style='font-size: 12px; color: #999;'>If you did not request this, you can safely ignore this email.</p>"
                + "          <p style='font-size: 12px; color: #999;'>&copy; " + java.time.Year.now() + " Money Manager. All rights reserved.</p>"
                + "        </td></tr>"
                + "      </table>"
                + "    </td></tr>"
                + "  </table>"
                + "</body></html>";
    }
}
