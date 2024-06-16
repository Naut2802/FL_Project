package com.littlesunny.repository;

import com.littlesunny.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
	Boolean existsByUsername(String username);
	Boolean existsByEmail(String email);
}
