package com.littlesunny.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ClassStudentResponse {
	String className;
	float score;
	LocalDate joinDate;
	double tuitionFee;
	LocalDate expirationDate;
	boolean isPaidFee;
}
