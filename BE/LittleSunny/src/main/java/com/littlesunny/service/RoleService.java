package com.littlesunny.service;

import com.littlesunny.dto.request.RoleRequest;
import com.littlesunny.dto.response.RoleResponse;
import com.littlesunny.entity.Permission;
import com.littlesunny.entity.Role;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.mapper.RoleMapper;
import com.littlesunny.repository.PermissionRepository;
import com.littlesunny.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class RoleService {
	RoleMapper roleMapper;
	PermissionRepository permissionRepository;
	RoleRepository roleRepository;
	
	public RoleResponse createRole(RoleRequest request) {
		var role = roleMapper.toRole(request);
		
		var permissions = permissionRepository.findAllById(request.getPermissions());
		role.setPermissions(new HashSet<>(permissions));
		
		roleRepository.save(role);
		return roleMapper.toRoleResponse(role);
	}
	
	public RoleResponse updateRole(String roleName, RoleRequest request) {
		Role role = roleRepository.findById(roleName).orElseThrow(() -> new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION));
		
		List<Permission> permissions = permissionRepository.findAllById(request.getPermissions());
		role.setPermissions(new HashSet<>(permissions));
		
		roleMapper.updateRole(role, request);
		return roleMapper.toRoleResponse(roleRepository.save(role));
	}
	
	public void deleteRole(String role) {
		roleRepository.deleteById(role);
	}
	
	public List<RoleResponse> getRoles() {
		return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
	}
}
