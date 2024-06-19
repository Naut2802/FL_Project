package com.littlesunny.config;

import com.littlesunny.dto.request.IntrospectRequest;
import com.littlesunny.exception.CustomAuthenticationException;
import com.littlesunny.service.AuthenticationService;
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
import java.util.Objects;

@Component
public class CustomJwtDecoder implements JwtDecoder {
	@Value("${jwt.access-token-secret-signature}")
	private String ACCESS_TOKEN_SIGNATURE;
	@Autowired
	private AuthenticationService authenticationService;
	private NimbusJwtDecoder decoder = null;
	
	
	@Override
	public Jwt decode(String token) throws JwtException {
		try {
			var response = authenticationService.introspect(IntrospectRequest.builder().token(token).build());
			
			if (response.getErrorCode() != null
					&& response.getErrorCode().getStatusCode().isSameCodeAs(HttpStatus.GONE))
				throw new JwtException("Token expired");
			
			if (!response.isValid()) throw new JwtException("Token invalid");
		} catch (JwtException e) {
			throw new CustomAuthenticationException("JWT exception", e);
		}
		
		if (Objects.isNull(decoder)) {
			SecretKeySpec secretKeySpec = new SecretKeySpec(ACCESS_TOKEN_SIGNATURE.getBytes(), "HS512");
			decoder = NimbusJwtDecoder.withSecretKey(secretKeySpec)
					.macAlgorithm(MacAlgorithm.HS512)
					.build();
		}
		
		return decoder.decode(token);
	}
}
