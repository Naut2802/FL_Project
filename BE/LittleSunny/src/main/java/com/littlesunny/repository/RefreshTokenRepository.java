package com.littlesunny.repository;

import com.littlesunny.entity.RefreshTokenWhiteList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.security.interfaces.RSAPublicKey;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshTokenWhiteList, String> {
	Optional<RefreshTokenWhiteList> findByToken(String token);
	void deleteByToken(String token);
}
