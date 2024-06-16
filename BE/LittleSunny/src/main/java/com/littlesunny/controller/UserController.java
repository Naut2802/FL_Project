package com.littlesunny.controller;

import com.littlesunny.dto.request.UserCreationRequest;
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
}
