package com.littlesunny.mapper;

import com.littlesunny.dto.ClassDTO;
import com.littlesunny.entity.Class;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ClassMapper {
	@Mapping(target = "students", ignore = true)
	Class toClass(ClassDTO request);
	
	ClassDTO toClassDto(Class clazz);
	
	@Mapping(target = "students", ignore = true)
	void updateClass(@MappingTarget Class clazz, ClassDTO request);
}
