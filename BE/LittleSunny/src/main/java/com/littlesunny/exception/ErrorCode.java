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
	INVALID_KEY(1001, "Thông tin đăng nhập không chính xác", HttpStatus.BAD_REQUEST),
	USER_EXISTED(1002, "Tài khoản đã tồn tại", HttpStatus.BAD_REQUEST),
	USERNAME_INVALID(1003, "Tên đăng nhập yêu cầu tối thiểu 6 ký tự", HttpStatus.BAD_REQUEST),
	INVALID_PASSWORD(1004, "Mật khẩu yêu cầu tối thiểu 5 ký tự", HttpStatus.BAD_REQUEST),
	USER_NOT_EXISTED(1005, "Tài khoản hoặc mật khẩu không chính xác", HttpStatus.NOT_FOUND),
	UNAUTHENTICATED(1006, "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại", HttpStatus.UNAUTHORIZED),
	UNAUTHORIZED(1007, "Không đủ quyền hạn để thực hiện hành động này", HttpStatus.FORBIDDEN),
	INVALID_DOB(1008, "Số tuổi không hợp lệ (> 5)", HttpStatus.BAD_REQUEST),
	TOKEN_EXPIRED(1100, "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại", HttpStatus.GONE),
	PERMISSION_NOT_EXISTED(1009, "Không tìm thấy", HttpStatus.NOT_FOUND),
	ROLE_NOT_EXISTED(1010, "Không tìm thấy", HttpStatus.NOT_FOUND),
	COURSE_NOT_EXISTED(1011, "Không tìm thấy", HttpStatus.NOT_FOUND),
	CLASS_NOT_EXISTED(1012, "Không tìm thấy lớp", HttpStatus.NOT_FOUND),
	STUDENT_NOT_EXISTED(1013, "Không tìm thấy học viên", HttpStatus.NOT_FOUND),
	EXISTED(1014, "Đối tượng đã tồn tại", HttpStatus.BAD_REQUEST);
	
	int code;
	String message;
	HttpStatusCode statusCode;
}
