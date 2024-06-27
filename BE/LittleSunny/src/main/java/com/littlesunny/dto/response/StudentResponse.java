package com.littlesunny.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.littlesunny.entity.StudentClass;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StudentResponse {
	long id;
	String fullName;
	String address;
	LocalDate dob;
	String phoneNumber;
	String parentBankNumber;
	List<ClassStudentResponse> classes;
}
