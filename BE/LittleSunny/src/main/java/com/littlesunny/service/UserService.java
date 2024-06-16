package com.littlesunny.service;

import com.littlesunny.dto.request.UserCreationRequest;
import com.littlesunny.dto.request.UserUpdateRequest;
import com.littlesunny.dto.response.UserResponse;

import java.util.List;

public interface UserService {
	UserResponse createUser(UserCreationRequest request);
	List<UserResponse> getUsers();
	UserResponse updateUser(String userId, UserUpdateRequest request);
}
