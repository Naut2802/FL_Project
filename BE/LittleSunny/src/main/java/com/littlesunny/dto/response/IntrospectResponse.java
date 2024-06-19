package com.littlesunny.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.littlesunny.exception.ErrorCode;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class IntrospectResponse {
	boolean valid;
	ErrorCode errorCode;
}
