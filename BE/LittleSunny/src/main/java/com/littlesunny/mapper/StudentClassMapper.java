package com.littlesunny.mapper;

import com.littlesunny.dto.response.ClassStudentResponse;
import com.littlesunny.dto.response.StudentClassResponse;
import com.littlesunny.entity.StudentClass;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface StudentClassMapper {
	StudentClassMapper INSTANCE = Mappers.getMapper(StudentClassMapper.class);
	
	@Mapping(source = "student.fullName", target = "student")
	StudentClassResponse toStudentClassResponse(StudentClass studentClass);
	
	@Mapping(source = "clazz.className", target = "className")
	ClassStudentResponse toClassStudentResponse(StudentClass studentClass);
}
