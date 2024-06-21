package com.littlesunny.repository;

import com.littlesunny.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
	boolean existsByPermissionName(String permissionName);
	List<Permission> findAllByPermissionName(Iterable<String> names);
}
