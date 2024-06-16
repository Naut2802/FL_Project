package com.littlesunny.mapper;

import com.littlesunny.dto.request.UserCreationRequest;
import com.littlesunny.dto.response.UserResponse;
import com.littlesunny.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
	User toUser(UserCreationRequest request);
	
	UserResponse toUserResponse(User user);
}
