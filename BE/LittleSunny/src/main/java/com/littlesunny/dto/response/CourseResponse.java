package com.littlesunny.dto.response;

import com.littlesunny.entity.Class;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseResponse {
	String courseName;
	String coursePrice;
	Set<Class> classes;
}
