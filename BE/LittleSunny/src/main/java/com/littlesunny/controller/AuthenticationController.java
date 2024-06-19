package com.littlesunny.controller;

import com.littlesunny.dto.request.IntrospectRequest;
import com.littlesunny.dto.request.LoginRequest;
import com.littlesunny.dto.request.LogoutRequest;
import com.littlesunny.dto.request.RefreshRequest;
import com.littlesunny.dto.response.AuthenticationResponse;
import com.littlesunny.dto.response.IntrospectResponse;
import com.littlesunny.dto.response.ResponseApi;
import com.littlesunny.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthenticationController {
	AuthenticationService authenticationService;
	
	@PostMapping
	public ResponseApi<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
		return ResponseApi.<IntrospectResponse>builder()
				.result(authenticationService.introspect(request))
				.build();
	}
	
	@PostMapping("/login")
	public ResponseApi<AuthenticationResponse> authenticate(@RequestBody LoginRequest request) {
		return ResponseApi.<AuthenticationResponse>builder()
				.result(authenticationService.authenticate(request))
				.build();
	}
	
	@DeleteMapping("/logout")
	public ResponseApi<String> authenticate(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
		authenticationService.logout(request);
		return ResponseApi.<String>builder()
				.result("Has been logged out")
				.build();
	}
	
	@PutMapping("/refresh")
	public ResponseApi<AuthenticationResponse> authenticate(@RequestBody RefreshRequest request) throws ParseException, JOSEException {
		return ResponseApi.<AuthenticationResponse>builder()
				.result(authenticationService.refreshToken(request))
				.build();
	}
}
