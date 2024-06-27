package com.littlesunny.mapper;

import com.littlesunny.dto.request.CourseRequest;
import com.littlesunny.dto.response.CourseResponse;
import com.littlesunny.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CourseMapper {
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "classes", ignore = true)
	Course toCourse(CourseRequest request);
	
	@Mapping(source = "id", target = "courseId")
	@Mapping(target = "classes", ignore = true)
	CourseResponse toCourseResponse(Course course);
	
	@Mapping(target = "classes", ignore = true)
	void updateCourse(@MappingTarget Course course, CourseRequest request);
}
