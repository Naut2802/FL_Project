package com.littlesunny.service;

import com.littlesunny.dto.request.IntrospectRequest;
import com.littlesunny.dto.request.LoginRequest;
import com.littlesunny.dto.request.LogoutRequest;
import com.littlesunny.dto.request.RefreshRequest;
import com.littlesunny.dto.response.AuthenticationResponse;
import com.littlesunny.dto.response.IntrospectResponse;
import com.littlesunny.entity.InvalidatedToken;
import com.littlesunny.entity.User;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
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
	
	@NonFinal
	@Value("${jwt.access-signer-signature}")
	String ACCESS_SIGNER_KEY;
	@NonFinal
	@Value("${jwt.refresh-signer-signature}")
	String REFRESH_SIGNER_KEY;
	
	@NonFinal
	@Value("${jwt.access-valid-duration}")
	long ACCESS_VALID_DURATION;
	@NonFinal
	@Value("${jwt.refresh-valid-duration}")
	long REFRESH_VALID_DURATION;
	
	public IntrospectResponse introspect(IntrospectRequest request) throws ParseException, JOSEException {
		var token = request.getToken();
		boolean isValid = true;
		
		try {
			verifyToken(token, ACCESS_SIGNER_KEY);
		} catch (AppException e) {
			isValid = false;
		}
		
		return IntrospectResponse.builder()
				.valid(isValid)
				.build();
	}
	
	public AuthenticationResponse authenticate(LoginRequest request) {
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
		var user = userRepository
				.findByUsername(request.getUsername())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		
		boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
		
		if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);
		
		var accessToken = generateToken(user, ACCESS_SIGNER_KEY, ACCESS_VALID_DURATION);
		var refreshToken = generateToken(user, REFRESH_SIGNER_KEY, REFRESH_VALID_DURATION);
		
		return AuthenticationResponse.builder()
				.accessToken(accessToken)
				.refreshToken(refreshToken)
				.authenticated(true)
				.build();
	}
	
	public void logout(LogoutRequest request) throws ParseException, JOSEException {
		try {
			SignedJWT signedJWT = verifyToken(request.getToken(), ACCESS_SIGNER_KEY);
			
			String jwtId = signedJWT.getJWTClaimsSet().getJWTID();
			var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
			
			InvalidatedToken invalidatedToken =
					invalidatedTokenRepository.save(InvalidatedToken.builder()
							.id(jwtId)
							.expiryTime(expiryTime).build());
		} catch (AppException e) {
			log.info("JWT expired");
		}
	}
	
	public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {
		SignedJWT signedJWT = verifyToken(request.getToken(), REFRESH_SIGNER_KEY);
		User user = userRepository.findByUsername(signedJWT.getJWTClaimsSet().getSubject())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		
		var accessToken = generateToken(user, ACCESS_SIGNER_KEY, ACCESS_VALID_DURATION);
		
		return AuthenticationResponse.builder()
				.accessToken(accessToken)
				.refreshToken(request.getToken())
				.authenticated(true)
				.build();
	}
	
	private String generateToken(User user, String signerSignature, long validDuration) {
		JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
		
		JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
				.subject(user.getUsername())
				.issuer("LittleSunny")
				.issueTime(new Date())
				.expirationTime(new Date(Instant.now().plus(validDuration, ChronoUnit.SECONDS).toEpochMilli()))
				.jwtID(UUID.randomUUID().toString())
				.claim("scope", buildScope(user))
				.build();
		
		Payload payload = new Payload(claimsSet.toJSONObject());
		JWSObject object = new JWSObject(header, payload);
		
		try {
			object.sign(new MACSigner(signerSignature.getBytes()));
			return object.serialize();
		} catch (JOSEException e) {
			log.error("Cannot create JWT", e);
			throw new RuntimeException(e);
		}
	}
	
	private SignedJWT verifyToken(String token, String signerSignature) throws JOSEException, ParseException {
		SignedJWT signedJWT = SignedJWT.parse(token);
		
		JWSVerifier verifier = new MACVerifier(signerSignature.getBytes());
		
		Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
		
		var verified = signedJWT.verify(verifier);
		
		if(!(verified && expiryTime.after(new Date())))
			throw new AppException(ErrorCode.UNAUTHENTICATED);
		
		if(!userRepository.existsByUsername(signedJWT.getJWTClaimsSet().getSubject()))
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		
		if(invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
			throw new AppException(ErrorCode.UNAUTHENTICATED);
			
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
