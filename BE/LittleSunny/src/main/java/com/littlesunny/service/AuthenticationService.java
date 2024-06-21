package com.littlesunny.service;

import com.littlesunny.dto.request.IntrospectRequest;
import com.littlesunny.dto.request.LoginRequest;
import com.littlesunny.dto.request.LogoutRequest;
import com.littlesunny.dto.request.RefreshRequest;
import com.littlesunny.dto.response.AuthenticationResponse;
import com.littlesunny.dto.response.IntrospectResponse;
import com.littlesunny.entity.InvalidatedToken;
import com.littlesunny.entity.RefreshTokenWhiteList;
import com.littlesunny.entity.User;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.repository.RedisTokenRepository;
import com.littlesunny.repository.InvalidatedTokenRepository;
import com.littlesunny.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
	UserRepository userRepository;
	InvalidatedTokenRepository invalidatedTokenRepository;
	RedisTokenRepository redisTokenRepository;
	
	@NonFinal
	@Value("${jwt.access-token-secret-signature}")
	String ACCESS_TOKEN_SIGNATURE;
	@NonFinal
	@Value("${jwt.refresh-token-secret-signature}")
	String REFRESH_TOKEN_SIGNATURE;
	
	@NonFinal
	@Value("${jwt.access-token-valid-duration}")
	long ACCESS_TOKEN_VALID_DURATION;
	@NonFinal
	@Value("${jwt.refresh-token-valid-duration}")
	long REFRESH_TOKEN_VALID_DURATION;
	
	public IntrospectResponse introspect(IntrospectRequest request) {
		var token = request.getToken();
		boolean isValid = true;
		ErrorCode errorCode = null;
		
		try {
			verifyToken(token, false);
		} catch (AppException e) {
			errorCode = e.getErrorCode();
			isValid = false;
		} catch (JOSEException | ParseException e) {
			System.out.println(e.getMessage());
		}
		
		return IntrospectResponse.builder()
				.valid(isValid)
				.errorCode(errorCode)
				.build();
	}
	
	public AuthenticationResponse authenticate(LoginRequest request) {
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
		var user = userRepository
				.findByUsername(request.getUsername())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		
		boolean authenticated = passwordEncoder.matches(request.getUsername() + request.getPassword(), user.getPassword());
		
		if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);
		
		var accessToken = generateToken(user, ACCESS_TOKEN_SIGNATURE, ACCESS_TOKEN_VALID_DURATION);
		var refreshToken = generateToken(user, REFRESH_TOKEN_SIGNATURE, REFRESH_TOKEN_VALID_DURATION);
		
		redisTokenRepository.save(RefreshTokenWhiteList.builder()
				.token(refreshToken)
				.expiryTime(new Date(Instant.now().plus(REFRESH_TOKEN_VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
				.user(user)
				.build());
		
		return AuthenticationResponse.builder()
				.accessToken(accessToken)
				.refreshToken(refreshToken)
				.authenticated(true)
				.build();
	}
	
	@Transactional
	public void logout(LogoutRequest request) throws ParseException, JOSEException {
		try {
			SignedJWT signedJWT = verifyToken(request.getAccessToken(), false);
			
			String jwtId = signedJWT.getJWTClaimsSet().getJWTID();
			var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
			
			InvalidatedToken invalidatedToken =
					invalidatedTokenRepository.save(InvalidatedToken.builder()
							.id(jwtId)
							.expiryTime(expiryTime).build());
			
			redisTokenRepository.deleteByToken(request.getRefreshToken());
		} catch (AppException e) {
			log.info(e.getMessage());
		}
	}
	
	@Transactional
	public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {
		SignedJWT signedJWT = null;
		try {
			signedJWT = verifyToken(request.getToken(), true);
		} catch (AppException e) {
			if (e.getErrorCode().getStatusCode().isSameCodeAs(HttpStatus.GONE))
				throw new AppException(ErrorCode.UNAUTHENTICATED);
		}
		
		User user = userRepository.findByUsername(signedJWT.getJWTClaimsSet().getSubject())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		
		redisTokenRepository.findByToken(request.getToken())
				.orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
		
		redisTokenRepository.deleteByToken(request.getToken());
		
		var accessToken = generateToken(user, ACCESS_TOKEN_SIGNATURE, ACCESS_TOKEN_VALID_DURATION);
		var refreshToken = generateToken(user, REFRESH_TOKEN_SIGNATURE, REFRESH_TOKEN_VALID_DURATION);
		
		redisTokenRepository.save(RefreshTokenWhiteList.builder()
				.token(refreshToken)
				.expiryTime(new Date(Instant.now().plus(REFRESH_TOKEN_VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
				.user(user)
				.build());
		
		return AuthenticationResponse.builder()
				.accessToken(accessToken)
				.refreshToken(refreshToken)
				.authenticated(true)
				.build();
	}
	
	private String generateToken(User user, String secretSignature, long validDuration) {
		JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
		
		JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
				.subject(user.getUsername())
				.issuer("LittleSunny")
				.issueTime(new Date())
				.expirationTime(new Date(Instant.now().plus(validDuration, ChronoUnit.SECONDS).toEpochMilli()))
				.jwtID(UUID.randomUUID().toString())
				.claim("userId", user.getId())
				.claim("scope", buildScope(user))
				.build();
		
		Payload payload = new Payload(claimsSet.toJSONObject());
		JWSObject object = new JWSObject(header, payload);
		
		try {
			object.sign(new MACSigner(secretSignature.getBytes()));
			return object.serialize();
		} catch (JOSEException e) {
			log.error("Cannot create JWT", e);
			throw new RuntimeException(e);
		}
	}
	
	private SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {
		SignedJWT signedJWT = SignedJWT.parse(token);
		
		JWSVerifier verifier = new MACVerifier(isRefresh ? REFRESH_TOKEN_SIGNATURE : ACCESS_TOKEN_SIGNATURE);
		
		Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
		
		var verified = signedJWT.verify(verifier);
		
		if (!verified || invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
			throw new AppException(ErrorCode.UNAUTHENTICATED);
		
		if (!expiryTime.after(new Date()))
			throw new AppException(ErrorCode.TOKEN_EXPIRED);
		
		if (!userRepository.existsByUsername(signedJWT.getJWTClaimsSet().getSubject()))
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
			
		return signedJWT;
	}
	
	private String buildScope(User user) {
		StringJoiner stringJoiner = new StringJoiner(" ");
		
		if (!CollectionUtils.isEmpty(user.getRoles())) {
			user.getRoles().forEach(role -> {
				stringJoiner.add("ROLE_" + role.getName());
				if (!CollectionUtils.isEmpty(role.getPermissions())) {
					role.getPermissions().forEach(permission -> stringJoiner.add(permission.getName()));
				}
			});
		}
		
		return stringJoiner.toString();
	}
}
