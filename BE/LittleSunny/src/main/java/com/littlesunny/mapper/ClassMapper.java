package com.littlesunny.mapper;

import com.littlesunny.dto.request.ClassRequest;
import com.littlesunny.dto.response.ClassResponse;
import com.littlesunny.entity.Class;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ClassMapper {
	
	@Mapping(target = "studentClasses", ignore = true)
	Class toClass(ClassRequest request);
	
	@Mapping(source = "course.courseName", target = "courseName")
	ClassResponse toClassDto(Class clazz);
	
	@Mapping(target = "studentClasses", ignore = true)
	@Mapping(target = "course", ignore = true)
	void updateClass(@MappingTarget Class clazz, ClassRequest request);
}
