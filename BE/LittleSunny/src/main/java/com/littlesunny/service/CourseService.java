package com.littlesunny.service;

import com.littlesunny.dto.request.CourseRequest;
import com.littlesunny.dto.response.CourseResponse;
import com.littlesunny.entity.Class;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.mapper.CourseMapper;
import com.littlesunny.repository.ClassRepository;
import com.littlesunny.repository.CourseRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class CourseService {
	CourseRepository courseRepository;
	ClassRepository classRepository;
	CourseMapper courseMapper;
	
	public CourseResponse createCourse(CourseRequest request) {
		if (courseRepository.existsByCourseName(request.getCourseName()))
			throw new AppException(ErrorCode.EXISTED);
			
		var course = courseMapper.toCourse(request);
		return courseMapper.toCourseResponse(courseRepository.save(course));
	}
	
	public CourseResponse updateCourse(long id, CourseRequest request) {
		var course = courseRepository.findById(id).orElseThrow(() ->
				new AppException(ErrorCode.COURSE_NOT_EXISTED));
		
		courseMapper.updateCourse(course, request);
		List<Class> classes = classRepository.findAllByClassName(request.getClasses());
		
		course.setClasses(new HashSet<>(classes));
		return courseMapper.toCourseResponse(courseRepository.save(course));
	}
	
	public void deleteCourse(long id) {
		if (!courseRepository.existsById(id))
			throw new AppException(ErrorCode.COURSE_NOT_EXISTED);
		
		courseRepository.deleteById(id);
	}
	
	public List<CourseResponse> getCourses() {
		return courseRepository.findAll().stream().map(courseMapper::toCourseResponse).toList();
	}
}
