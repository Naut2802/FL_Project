package com.littlesunny.repository;

import com.littlesunny.entity.RefreshTokenWhiteList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RedisTokenRepository extends JpaRepository<RefreshTokenWhiteList, Long> {
	Optional<RefreshTokenWhiteList> findByToken(String token);
	void deleteByToken(String token);
}
