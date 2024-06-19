package com.littlesunny.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudentRequest {
	String fullName;
	String address;
	LocalDate dob;
	String phoneNumber;
	String parentBankNumber;
}
