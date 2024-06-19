package com.littlesunny.service;

import com.littlesunny.dto.request.PermissionRequest;
import com.littlesunny.dto.response.PermissionResponse;
import com.littlesunny.entity.Permission;
import com.littlesunny.mapper.PermissionMapper;
import com.littlesunny.repository.PermissionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class PermissionService {
	PermissionRepository permissionRepository;
	PermissionMapper permissionMapper;
	
	public PermissionResponse createPermission(PermissionRequest request) {
		var permission = permissionMapper.toPermission(request);
		return permissionMapper.toPermissionResponse(permissionRepository.save(permission));
	}
	
	public PermissionResponse updatePermission(String name, PermissionRequest request) {
		Permission permission = permissionMapper.toPermission(request);
		
		permissionMapper.updatePermission(permission, request);
		return permissionMapper.toPermissionResponse(permissionRepository.save(permission));
	}
	
	public void deletePermission(String permission) {
		permissionRepository.deleteById(permission);
	}
	
	public List<PermissionResponse> getPermissions() {
		return permissionRepository.findAll().stream().map(permissionMapper::toPermissionResponse).toList();
	}
}
