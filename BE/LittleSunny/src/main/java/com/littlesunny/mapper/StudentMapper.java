package com.littlesunny.mapper;

import com.littlesunny.dto.StudentDTO;
import com.littlesunny.entity.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StudentMapper {
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "studentClasses", ignore = true)
	Student toStudent(StudentDTO request);
	
	StudentDTO toStudentDto(Student student);
	
	@Mapping(target = "studentClasses", ignore = true)
	void updateStudent(@MappingTarget Student student, StudentDTO request);
}
