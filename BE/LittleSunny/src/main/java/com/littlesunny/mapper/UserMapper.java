package com.littlesunny.mapper;

import com.littlesunny.dto.request.UserCreationRequest;
import com.littlesunny.dto.request.UserUpdateRequest;
import com.littlesunny.dto.response.UserResponse;
import com.littlesunny.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
	User toUser(UserCreationRequest request);
	
	UserResponse toUserResponse(User user);
	
	@Mapping(target = "roles", ignore = true)
	void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
