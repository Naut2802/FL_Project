package com.littlesunny.controller;

import com.littlesunny.dto.request.*;
import com.littlesunny.dto.response.AuthenticationResponse;
import com.littlesunny.dto.response.ResponseApi;
import com.littlesunny.dto.response.UserResponse;
import com.littlesunny.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.text.ParseException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthenticationController {
	AuthenticationService authenticationService;
	
	@PostMapping("/sign-up")
	public ResponseApi<UserResponse> register(@RequestBody UserCreationRequest request) throws ParseException, JOSEException {
		return ResponseApi.<UserResponse>builder()
				.result(authenticationService.register(request))
				.build();
	}
	
	@PostMapping("/sign-in")
	public ResponseApi<AuthenticationResponse> authenticate(HttpServletResponse response, @RequestBody LoginRequest request) throws NoSuchAlgorithmException {
		return ResponseApi.<AuthenticationResponse>builder()
				.result(authenticationService.authenticate(response, request))
				.build();
	}
	
	@PutMapping("/refresh-token")
	public ResponseApi<AuthenticationResponse> authenticate(HttpServletRequest request, HttpServletResponse response, @RequestBody RefreshRequest userId) throws ParseException, JOSEException, NoSuchAlgorithmException {
		return ResponseApi.<AuthenticationResponse>builder()
				.result(authenticationService.refreshToken(request, response, userId))
				.build();
	}
}
