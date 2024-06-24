package com.littlesunny.config;

import com.littlesunny.dto.request.IntrospectRequest;
import com.littlesunny.dto.request.RefreshRequest;
import com.littlesunny.dto.response.AuthenticationResponse;
import com.littlesunny.dto.response.IntrospectResponse;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.CustomAuthenticationException;
import com.littlesunny.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.naming.AuthenticationException;
import java.text.ParseException;
import java.util.Objects;

@Component
@Slf4j
public class CustomJwtDecoder implements JwtDecoder {
	@Value("${jwt.access-token-secret-signature}")
	private String ACCESS_TOKEN_SIGNATURE;
	@Value("${jwt.refresh-token-secret-signature}")
	private String REFRESH_TOKEN_SIGNATURE;
	@Autowired
	private AuthenticationService authenticationService;
	private NimbusJwtDecoder decoder = null;
	
	
	@Override
	public Jwt decode(String token) throws JwtException {
		IntrospectResponse newResponse = null;
		try {
			var response = authenticationService.introspect(IntrospectRequest.builder().token(token).build(), false);
			if (response.getErrorCode() != null && response.getErrorCode().getStatusCode().isSameCodeAs(HttpStatus.GONE)) {
				throw new JwtException("Token expired");
			} else if (response.getErrorCode() != null && response.getErrorCode().getStatusCode().isSameCodeAs(HttpStatus.UNAUTHORIZED)){
				newResponse = authenticationService.introspect(IntrospectRequest.builder().token(token).build(), true);
				if (newResponse.getErrorCode() != null && response.getErrorCode().getStatusCode().isSameCodeAs(HttpStatus.GONE)) {
					throw new JwtException("Token invalid");
				}
			}
		} catch (JwtException e) {
			throw new CustomAuthenticationException("JWT exception", e);
		}
		
		String tokenSignature = newResponse != null ? REFRESH_TOKEN_SIGNATURE : ACCESS_TOKEN_SIGNATURE;
		SecretKeySpec secretKeySpec = new SecretKeySpec(tokenSignature.getBytes(), "HS512");
		decoder = NimbusJwtDecoder.withSecretKey(secretKeySpec)
				.macAlgorithm(MacAlgorithm.HS512)
				.build();
		
		return decoder.decode(token);
	}
}
