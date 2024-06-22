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
	
	@PutMapping("/{id}")
	public ResponseApi<RoleResponse> updateRole(@PathVariable long id, @RequestBody RoleRequest request) {
		return ResponseApi.<RoleResponse>builder()
				.result(roleService.updateRole(id, request))
				.build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseApi<String> deleteRole(@PathVariable long id) {
		roleService.deleteRole(id);
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
