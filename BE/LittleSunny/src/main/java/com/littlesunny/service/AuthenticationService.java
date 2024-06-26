package com.littlesunny.service;

import com.littlesunny.security.jwt.KeyUtils;
import com.littlesunny.dto.request.*;
import com.littlesunny.dto.response.AuthenticationResponse;
import com.littlesunny.dto.response.UserResponse;
import com.littlesunny.entity.RefreshTokenWhiteList;
import com.littlesunny.entity.User;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.mapper.UserMapper;
import com.littlesunny.repository.RefreshTokenRepository;
import com.littlesunny.repository.RoleRepository;
import com.littlesunny.repository.UserRepository;
import com.nimbusds.jose.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.KeyPair;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;
import java.text.ParseException;
import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
	UserRepository userRepository;
	RefreshTokenRepository refreshTokenRepository;
	JwtService jwtService;
	UserMapper userMapper;
	PasswordEncoder passwordEncoder;
	RoleRepository roleRepository;
	KeyUtils keyUtils;
	KeyService keyService;
	
	
	@NonFinal
	@Value("${jwt.access-token-valid-duration}")
	long ACCESS_TOKEN_VALID_DURATION;
	@NonFinal
	@Value("${jwt.refresh-token-valid-duration}")
	long REFRESH_TOKEN_VALID_DURATION;
	
	public UserResponse register(UserCreationRequest request) {
		if(userRepository.existsByUsername(request.getUsername()))
			throw new AppException(ErrorCode.USER_EXISTED);

		var user = userMapper.toUser(request);

		user.setPassword(encodePassword(user.getUsername(), user.getPassword()));

		var role = roleRepository.findByRoleName("USER").orElseThrow(() ->
				new AppException(ErrorCode.ROLE_NOT_EXISTED));

		user.setRoles(new HashSet<>(List.of(role)));

		return userMapper.toUserResponse(userRepository.save(user));
	}
	
	public AuthenticationResponse authenticate(HttpServletResponse response, LoginRequest request) throws NoSuchAlgorithmException {
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
		var user = userRepository
				.findByUsername(request.getUsername())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		
		boolean authenticated = passwordEncoder.matches(request.getUsername() + request.getPassword(), user.getPassword());
		
		if (!authenticated) throw new AppException(ErrorCode.USER_NOT_EXISTED);
		
		KeyPair keyPair = keyUtils.generateKeyPair();
		var accessToken = jwtService.generateAccessToken(user, keyPair);
		String jti = accessToken.substring(accessToken.length()-10);
		var refreshToken = jwtService.generateRefreshToken(user, jti, keyPair);
		String publicKey = keyUtils.exchangeRSAPublicKeyToString((RSAPublicKey) keyPair.getPublic());
		
		saveRefreshToken(user, refreshToken, publicKey);
		
		createRefreshTokenCookie(response, refreshToken);
		
		return AuthenticationResponse.builder()
				.accessToken(accessToken)
				.userId(user.getId())
				.authenticated(true)
				.build();
	}
	
	@Transactional
	public AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response, RefreshRequest refreshRequest) throws ParseException, JOSEException, NoSuchAlgorithmException {
		User user = userRepository.findById(refreshRequest.getUserId())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		
		var refreshTokenFromCookies = getRefreshTokenFromCookies(request);
		
		var refreshTokenFromRepo = refreshTokenRepository.findByToken(refreshTokenFromCookies)
				.orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
		if (refreshTokenFromRepo.getExpiryTime().toInstant().isBefore(Instant.now())) {
			throw new AppException(ErrorCode.TOKEN_EXPIRED);
		}
		
		refreshTokenRepository.deleteByToken(refreshTokenFromCookies);
		
		KeyPair keyPair = keyUtils.generateKeyPair();
		var accessToken = jwtService.generateAccessToken(user, keyPair);
		String jti = accessToken.substring(accessToken.length()-10);
		var refreshToken = jwtService.generateRefreshToken(user, jti, keyPair);
		String publicKey = keyUtils.exchangeRSAPublicKeyToString((RSAPublicKey) keyPair.getPublic());
		
		saveRefreshToken(user, refreshToken, publicKey);
		
		createRefreshTokenCookie(response, refreshToken);
		
		return AuthenticationResponse.builder()
				.accessToken(accessToken)
				.userId(user.getId())
				.authenticated(true)
				.build();
	}
	
	private void saveRefreshToken(User user, Jwt refreshToken, String publicKey) {
		refreshTokenRepository.save(RefreshTokenWhiteList.builder()
				.id(refreshToken.getId())
				.user(user)
				.token(refreshToken.getTokenValue())
				.publicKey(publicKey)
				.expiryTime(Date.from(refreshToken.getExpiresAt()))
				.build());
	}
	
	private void createRefreshTokenCookie(HttpServletResponse response, Jwt refreshToken) {
		Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken.getTokenValue());
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setSecure(true);
		refreshTokenCookie.setMaxAge((int) REFRESH_TOKEN_VALID_DURATION); // in seconds
		response.addCookie(refreshTokenCookie);
	}
	
	private String getRefreshTokenFromCookies(HttpServletRequest request) {
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if ("refresh_token".equals(cookie.getName())) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}
	
	private String encodePassword(String username, String password) {
		return passwordEncoder.encode(username + password);
	}
}
