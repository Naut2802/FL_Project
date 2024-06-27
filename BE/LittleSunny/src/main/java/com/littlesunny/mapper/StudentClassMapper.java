package com.littlesunny.mapper;

import com.littlesunny.dto.response.ClassStudentResponse;
import com.littlesunny.dto.response.StudentClassResponse;
import com.littlesunny.entity.StudentClass;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface StudentClassMapper {
	@Mapping(source = "student.id", target = "studentId")
	@Mapping(source = "student.fullName", target = "studentName")
	StudentClassResponse toStudentClassResponse(StudentClass studentClass);
	
	@Mapping(source = "clazz.id", target = "classId")
	@Mapping(source = "clazz.className", target = "className")
	ClassStudentResponse toClassStudentResponse(StudentClass studentClass);
}
