package com.littlesunny.service;

import com.littlesunny.dto.request.CourseRequest;
import com.littlesunny.dto.response.CourseResponse;
import com.littlesunny.entity.Class;
import com.littlesunny.entity.Course;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.mapper.ClassMapper;
import com.littlesunny.mapper.CourseMapper;
import com.littlesunny.repository.ClassRepository;
import com.littlesunny.repository.CourseRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
	ClassMapper classMapper;
	
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
		List<Class> classes = classRepository.findAllById(request.getClassIds());
		
		course.setClasses(new HashSet<>(classes));
		
		CourseResponse courseResponse = courseMapper.toCourseResponse(course);
		courseResponse.setClasses(course.getClasses() == null ? null :
				course.getClasses()
						.stream()
						.map(classMapper::toClassResponseForCourse).toList());
		
		return courseResponse;
	}
	
	public void deleteCourse(long id) {
		if (!courseRepository.existsById(id))
			throw new AppException(ErrorCode.COURSE_NOT_EXISTED);
		
		courseRepository.deleteById(id);
	}
	
	public List<CourseResponse> getCourses() {
		List<Course> courses = courseRepository.findAll();
		List<CourseResponse> courseResponses = new ArrayList<>();
		
		courses.forEach(course ->
				courseResponses.add(CourseResponse.builder()
								.courseId(course.getId())
								.courseName(course.getCourseName())
								.coursePrice(course.getCoursePrice())
								.classes(course.getClasses() == null ? null :
										course.getClasses()
												.stream()
												.map(classMapper::toClassResponseForCourse).toList())
						.build()));
		
		return courseResponses;
	}
	
	@Transactional(readOnly = true)
	public List<CourseResponse> getCoursesNotEnrolledByStudent(Long studentId) {
		List<Course> courses = courseRepository.findCoursesNotEnrolledByStudent(studentId);
		List<CourseResponse> courseResponse = new ArrayList<>();
		
		courses.forEach(course ->
				courseResponse.add(CourseResponse.builder()
								.courseId(course.getId())
								.courseName(course.getCourseName())
								.coursePrice(course.getCoursePrice())
								.classes(course.getClasses() == null ? null :
										course.getClasses()
												.stream()
												.map(classMapper::toClassResponseForCourse).toList())
						.build()));
		return courseResponse;
	}
}
