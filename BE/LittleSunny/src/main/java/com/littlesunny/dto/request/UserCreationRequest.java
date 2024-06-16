package com.littlesunny.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
	@Size(min = 4, message = "USERNAME_INVALID")
	String username;
	@Size(min = 4, message = "PASSWORD_INVALID")
	String password;
	String email;
}
