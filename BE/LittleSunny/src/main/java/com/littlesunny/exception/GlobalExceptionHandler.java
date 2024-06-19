package com.littlesunny.exception;

import com.littlesunny.dto.response.ResponseApi;
import jakarta.validation.ConstraintViolation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
	@ExceptionHandler(value = Exception.class)
	ResponseEntity<ResponseApi> handlingRuntimeException(RuntimeException exception) {
		log.error("Exception: ", exception);
		ResponseApi apiResponse = new ResponseApi();
		
		apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
		apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
		
		return ResponseEntity.badRequest().body(apiResponse);
	}
	
	@ExceptionHandler(value = AppException.class)
	ResponseEntity<ResponseApi> appExceptionHandling(AppException appException) {
		ErrorCode errorCode = appException.getErrorCode();
		ResponseApi responseApi = new ResponseApi();
		
		responseApi.setCode(errorCode.getCode());
		responseApi.setMessage(errorCode.getMessage());
		
		return ResponseEntity.status(errorCode.getStatusCode()).body(responseApi);
	}
	
	@ExceptionHandler(value = AccessDeniedException.class)
	ResponseEntity<ResponseApi> handlingAccessDeniedException(AccessDeniedException exception) {
		ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
		
		return ResponseEntity.status(errorCode.getStatusCode())
				.body(ResponseApi.builder()
						.code(errorCode.getCode())
						.message(errorCode.getMessage())
						.build());
	}
}
