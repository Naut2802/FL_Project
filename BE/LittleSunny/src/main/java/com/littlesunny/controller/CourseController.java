package com.littlesunny.controller;

import com.littlesunny.dto.request.CourseRequest;
import com.littlesunny.dto.response.CourseResponse;
import com.littlesunny.dto.response.ResponseApi;
import com.littlesunny.service.CourseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/course")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CourseController {
	CourseService courseService;
	
	@PostMapping
	public ResponseApi<CourseResponse> createCourse(@RequestBody CourseRequest request) {
		return ResponseApi.<CourseResponse>builder()
				.result(courseService.createCourse(request))
				.build();
	}
	
	@PutMapping("/{id}")
	public ResponseApi<CourseResponse> updateCourse(@PathVariable long id, @RequestBody CourseRequest request) {
		return ResponseApi.<CourseResponse>builder()
				.result(courseService.updateCourse(id, request))
				.build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseApi<?> deleteCourse(@PathVariable long id) {
		courseService.deleteCourse(id);
		
		return ResponseApi.builder()
				.result("Course has been deleted")
				.build();
	}
	
	@GetMapping
	public ResponseApi<List<CourseResponse>> getCourses() {
		return ResponseApi.<List<CourseResponse>>builder()
				.result(courseService.getCourses())
				.build();
	}
}
