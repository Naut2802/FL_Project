package com.littlesunny.dto;

import com.littlesunny.entity.StudentClass;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudentDTO {
	String fullName;
	String address;
	LocalDate dob;
	String phoneNumber;
	String parentBankNumber;
	
	Set<StudentClass> classes;
}
