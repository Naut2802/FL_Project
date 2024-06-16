package com.littlesunny.exception;

import com.littlesunny.dto.response.ResponseApi;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
	@ExceptionHandler(value = AppException.class)
	ResponseEntity<ResponseApi> appExceptionHandling(AppException appException) {
		ErrorCode errorCode = appException.getErrorCode();
		ResponseApi responseApi = new ResponseApi<>();
		
		responseApi.setCode(errorCode.getCode());
		responseApi.setMessage(errorCode.getMessage());
		
		return ResponseEntity.status(errorCode.getStatusCode()).body(responseApi);
	}
}
