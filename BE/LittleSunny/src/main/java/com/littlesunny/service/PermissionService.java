package com.littlesunny.service;

import com.littlesunny.dto.request.PermissionRequest;
import com.littlesunny.dto.response.PermissionResponse;
import com.littlesunny.entity.Permission;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
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
		if (permissionRepository.existsByPermissionName(request.getPermissionName()))
			throw new AppException(ErrorCode.EXISTED);
		
		var permission = permissionMapper.toPermission(request);
		return permissionMapper.toPermissionResponse(permissionRepository.save(permission));
	}
	
	public PermissionResponse updatePermission(long id, PermissionRequest request) {
		var permission = permissionRepository.findById(id).orElseThrow(() ->
				new AppException(ErrorCode.PERMISSION_NOT_EXISTED));
		
		permissionMapper.updatePermission(permission, request);
		return permissionMapper.toPermissionResponse(permissionRepository.save(permission));
	}
	
	public void deletePermission(long id) {
		if (!permissionRepository.existsById(id))
			throw new AppException(ErrorCode.PERMISSION_NOT_EXISTED);
		
		permissionRepository.deleteById(id);
	}
	
	public List<PermissionResponse> getPermissions() {
		return permissionRepository.findAll().stream().map(permissionMapper::toPermissionResponse).toList();
	}
}
