package com.moneymanager.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<Password, String> {

    // Pre-compiled regex patterns for efficiency
    private static final Pattern HAS_DIGIT = Pattern.compile(".*\\d.*");
    private static final Pattern HAS_UPPERCASE = Pattern.compile(".*[A-Z].*");
    private static final Pattern HAS_SPECIAL_CHAR = Pattern.compile(".*[!@#$%^&*()].*");

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        // Let @NotBlank handle null or empty passwords
        if (password == null) {
            return true;
        }

        List<String> violations = new ArrayList<>();

        if (password.length() < 6) {
            violations.add("must be at least 6 characters long");
        }

        if (!HAS_DIGIT.matcher(password).matches()) {
            violations.add("must contain at least one number");
        }

        if (!HAS_UPPERCASE.matcher(password).matches()) {
            violations.add("must contain at least one uppercase letter");
        }

        if (!HAS_SPECIAL_CHAR.matcher(password).matches()) {
            violations.add("must contain at least one special character (e.g., !@#$%^&*)");
        }
        // If there are no violations, the password is valid
        if (violations.isEmpty()) {
            return true;
        }
        // If there are violations, build a custom error message
        String messageTemplate = "Password " + String.join(", ", violations) + ".";

        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(messageTemplate)
                .addConstraintViolation();

        return false;
    }
}