package com.moneymanager.backend.mappers;

import com.moneymanager.backend.dto.UserDto;
import com.moneymanager.backend.dto.request.RegisterRequest;
import com.moneymanager.backend.models.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(RegisterRequest registerRequest);
    UserDto toDto(User user);
}
