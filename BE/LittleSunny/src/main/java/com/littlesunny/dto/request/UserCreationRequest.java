package com.littlesunny.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
	@Size(min = 4, message = "USERNAME_INVALID")
	String username;
	@Size(min = 4, message = "PASSWORD_INVALID")
	String password;
}
