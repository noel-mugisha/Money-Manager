package com.moneymanager.backend.exceptions;

public class RequireLoginException extends RuntimeException {
    public RequireLoginException(String message) {
        super(message);
    }
}
