package com.moneymanager.backend.controllers;

import com.moneymanager.backend.dto.response.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthCheckController {
    @GetMapping
    public ResponseEntity<MessageResponse> healthCheck () {
        return ResponseEntity.ok(new MessageResponse("Application is running..."));
    }
}
