package com.littlesunny.controller;

import com.littlesunny.dto.StudentDTO;
import com.littlesunny.dto.response.ResponseApi;
import com.littlesunny.service.StudentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/student")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class StudentController {
	StudentService studentService;
	
	@PostMapping
	public ResponseApi<StudentDTO> createStudent(@RequestBody StudentDTO request) {
		return ResponseApi.<StudentDTO>builder()
				.result(studentService.createStudent(request))
				.build();
	}
	
	@PutMapping("/{id}")
	public ResponseApi<StudentDTO> updateStudent(@PathVariable long id, @RequestBody StudentDTO request) {
		return ResponseApi.<StudentDTO>builder()
				.result(studentService.updateStudent(id, request))
				.build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseApi<?> deleteStudent(@PathVariable long id) {
		studentService.deleteStudent(id);
		return ResponseApi.builder()
				.result("Class has been deleted")
				.build();
	}
	
	@GetMapping
	public ResponseApi<List<StudentDTO>> getStudents() {
		return ResponseApi.<List<StudentDTO>>builder()
				.result(studentService.getStudents())
				.build();
	}
}
