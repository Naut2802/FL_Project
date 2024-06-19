package com.littlesunny.config;

import com.littlesunny.dto.request.IntrospectRequest;
import com.littlesunny.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;
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
			
			if (!response.isValid()) throw new JwtException("Token Invalid");
		} catch (JOSEException | ParseException e) {
			throw new JwtException(e.getMessage());
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
