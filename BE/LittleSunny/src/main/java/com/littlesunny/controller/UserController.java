package com.littlesunny.controller;

import com.littlesunny.dto.request.UserCreationRequest;
import com.littlesunny.dto.request.UserUpdateRequest;
import com.littlesunny.dto.response.ResponseApi;
import com.littlesunny.dto.response.UserResponse;
import com.littlesunny.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserController {
	UserService userService;
	
	@PostMapping
	public ResponseApi<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
		return ResponseApi.<UserResponse>builder()
				.result(userService.createUser(request))
				.build();
	}
	
	@GetMapping
	public ResponseApi<List<UserResponse>> getUsers() {
		return ResponseApi.<List<UserResponse>>builder()
				.result(userService.getUsers())
				.build();
	}
	
	@GetMapping("/{userId}")
	public ResponseApi<UserResponse> getUser(@PathVariable String userId) {
		return ResponseApi.<UserResponse>builder()
				.result(userService.getUser(userId))
				.build();
	}
	
	@GetMapping("/my-info")
	public ResponseApi<UserResponse> getMyInfo() {
		return ResponseApi.<UserResponse>builder()
				.result(userService.getMyInfo())
				.build();
	}
	
	@PutMapping("/{userId}")
	public ResponseApi<UserResponse> updateUser(@PathVariable String userId, @RequestBody UserUpdateRequest request) {
		return ResponseApi.<UserResponse>builder()
				.result(userService.updateUser(userId, request))
				.build();
	}
	
	@DeleteMapping("/{userId}")
	public ResponseApi<String> deleteUser(@PathVariable String userId) {
		userService.deleteUser(userId);
		return ResponseApi.<String>builder()
				.result("User has been deleted")
				.build();
	}
}
