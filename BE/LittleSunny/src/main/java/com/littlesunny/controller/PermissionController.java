package com.littlesunny.controller;


import com.littlesunny.dto.request.PermissionRequest;
import com.littlesunny.dto.response.PermissionResponse;
import com.littlesunny.dto.response.ResponseApi;
import com.littlesunny.service.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/permission")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PermissionController {
	PermissionService permissionService;
	
	@PostMapping
	public ResponseApi<PermissionResponse> createPermission(@RequestBody PermissionRequest request) {
		return ResponseApi.<PermissionResponse>builder()
				.result(permissionService.createPermission(request))
				.build();
	}
	
	@PutMapping("/{id}")
	public ResponseApi<PermissionResponse> updatePermission(@PathVariable long id, @RequestBody PermissionRequest request) {
		return ResponseApi.<PermissionResponse>builder()
				.result(permissionService.updatePermission(id, request))
				.build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseApi<String> deletePermission(@PathVariable long id) {
		permissionService.deletePermission(id);
		return ResponseApi.<String>builder()
				.result("Permission has been deleted.")
				.build();
	}
	
	@GetMapping
	public ResponseApi<List<PermissionResponse>> getPermissions() {
		return ResponseApi.<List<PermissionResponse>>builder()
				.result(permissionService.getPermissions())
				.build();
	}
}
