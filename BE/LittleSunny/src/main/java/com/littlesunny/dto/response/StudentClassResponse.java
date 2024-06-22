package com.littlesunny.dto.response;

import com.littlesunny.dto.StudentDTO;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudentClassResponse {
	String student;
	float score;
	LocalDate joinDate;
	double tuitionFee;
	LocalDate expirationDate;
	boolean isPaidFee;
}
