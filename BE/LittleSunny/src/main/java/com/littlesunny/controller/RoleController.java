package com.littlesunny.controller;


import com.littlesunny.dto.request.RoleRequest;
import com.littlesunny.dto.response.ResponseApi;
import com.littlesunny.dto.response.RoleResponse;
import com.littlesunny.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/role")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoleController {
	RoleService roleService;
	
	@PostMapping
	public ResponseApi<RoleResponse> createRole(@RequestBody RoleRequest request) {
		return ResponseApi.<RoleResponse>builder()
				.result(roleService.createRole(request))
				.build();
	}
	
	@PutMapping("/{role}")
	public ResponseApi<RoleResponse> updateRole(@PathVariable String role, @RequestBody RoleRequest request) {
		return ResponseApi.<RoleResponse>builder()
				.result(roleService.updateRole(role, request))
				.build();
	}
	
	@DeleteMapping("/{role}")
	public ResponseApi<String> deleteRole(@PathVariable String role) {
		roleService.deleteRole(role);
		return ResponseApi.<String>builder()
				.result("Role has been deleted.")
				.build();
	}
	
	@GetMapping
	public ResponseApi<List<RoleResponse>> getRoles() {
		return ResponseApi.<List<RoleResponse>>builder()
				.result(roleService.getRoles())
				.build();
	}
}
