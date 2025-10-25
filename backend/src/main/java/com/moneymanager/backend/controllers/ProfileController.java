package com.moneymanager.backend.controllers;

import com.moneymanager.backend.dto.UserDto;
import com.moneymanager.backend.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<UserDto> getUserProfile() {
        var userDto = profileService.getUserProfile();
        return ResponseEntity.ok(userDto);
    }
}
