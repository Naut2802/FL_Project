package com.littlesunny.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@AllArgsConstructor
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
	UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
	INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
	USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
	USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
	INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
	USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
	UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
	UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
	INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
	TOKEN_EXPIRED(1100, "Token expired", HttpStatus.GONE),
	PERMISSION_NOT_EXISTED(1009, "Permission not existed", HttpStatus.NOT_FOUND),
	ROLE_NOT_EXISTED(1010, "Role not existed", HttpStatus.NOT_FOUND),
	COURSE_NOT_EXISTED(1011, "Course not existed", HttpStatus.NOT_FOUND),
	CLASS_NOT_EXISTED(1012, "Class not existed", HttpStatus.NOT_FOUND),
	STUDENT_NOT_EXISTED(1013, "Student not existed", HttpStatus.NOT_FOUND),
	EXISTED(1014, "Entity existed", HttpStatus.BAD_REQUEST);
	
	int code;
	String message;
	HttpStatusCode statusCode;
}
