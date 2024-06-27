package com.littlesunny.mapper;

import com.littlesunny.dto.request.ClassRequest;
import com.littlesunny.dto.response.ClassResponse;
import com.littlesunny.dto.response.ClassResponseForCourse;
import com.littlesunny.entity.Class;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ClassMapper {
	@Mapping(target = "studentClasses", ignore = true)
	@Mapping(target = "course", ignore = true)
	Class toClass(ClassRequest request);
	
	@Mapping(source = "course.courseName", target = "courseName")
	@Mapping(source = "id", target = "classId")
	@Mapping(target = "students", ignore = true)
	ClassResponse toClassResponse(Class clazz);
	
	@Mapping(source = "id", target = "classId")
	ClassResponseForCourse toClassResponseForCourse(Class clazz);
	
	@Mapping(target = "studentClasses", ignore = true)
	@Mapping(target = "course", ignore = true)
	void updateClass(@MappingTarget Class clazz, ClassRequest request);
}
