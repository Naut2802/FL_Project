package com.littlesunny.mapper;

import com.littlesunny.dto.request.StudentRequest;
import com.littlesunny.dto.response.StudentResponse;
import com.littlesunny.entity.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StudentMapper {
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "studentClasses", ignore = true)
	Student toStudent(StudentRequest request);
	
	@Mapping(target = "classes", ignore = true)
	StudentResponse toStudentResponse(Student student);
	
	@Mapping(target = "studentClasses", ignore = true)
	void updateStudent(@MappingTarget Student student, StudentRequest request);
}
