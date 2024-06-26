package com.littlesunny.security.jwt;

import com.littlesunny.security.user.CustomUserDetails;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Objects;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JwtUtils {
	UserRepository userRepository;
	
	public String getUserId(Jwt jwt) {
		return jwt.getSubject();
	}
	
	public boolean isTokenValid(Jwt jwt) {
		boolean isTokenExpired = getIfTokenIsExpired(jwt);
		boolean isUserExist = userRepository.existsById(getUserId(jwt));
		
		if (isTokenExpired) throw new AppException(ErrorCode.TOKEN_EXPIRED);
		return !isTokenExpired && isUserExist;
	}
	
	private boolean getIfTokenIsExpired(Jwt jwt) {
		return Objects.requireNonNull(jwt.getExpiresAt()).isBefore(Instant.now());
	}
	
	public CustomUserDetails userDetails(String userId) {
		return userRepository.findById(userId)
				.map(CustomUserDetails::new)
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
	}
}
