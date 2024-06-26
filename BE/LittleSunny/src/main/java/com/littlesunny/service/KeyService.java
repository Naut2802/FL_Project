package com.littlesunny.service;

import com.littlesunny.security.jwt.KeyUtils;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.repository.RefreshTokenRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KeyService {
	KeyUtils keyUtils;
	RefreshTokenRepository refreshTokenRepository;
	
	public RSAPublicKey getPublicKey(String keyString) throws NoSuchAlgorithmException, InvalidKeySpecException {
		return keyUtils.exchangeRSAPublicKey(keyString);
	}
	
	public String getPublicKeyFromDb(String id) {
		return refreshTokenRepository.findById(id).orElseThrow(() ->
				new AppException(ErrorCode.UNAUTHENTICATED))
				.getPublicKey();
	}
}
