package com.littlesunny.dto.response;

import com.littlesunny.dto.StudentDTO;
import com.littlesunny.entity.Course;
import com.littlesunny.entity.StudentClass;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ClassResponse {
	String className;
	String courseName;
	List<StudentClassResponse> students;
}
