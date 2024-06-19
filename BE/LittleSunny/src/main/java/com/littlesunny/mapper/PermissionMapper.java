package com.littlesunny.mapper;

import com.littlesunny.dto.request.PermissionRequest;
import com.littlesunny.dto.response.PermissionResponse;
import com.littlesunny.entity.Permission;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
	Permission toPermission(PermissionRequest request);
	PermissionResponse toPermissionResponse(Permission permission);
	void updatePermission(@MappingTarget Permission permission, PermissionRequest request);
}
