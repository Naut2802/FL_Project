package com.littlesunny.controller;

import com.littlesunny.dto.ClassDTO;
import com.littlesunny.dto.response.ResponseApi;
import com.littlesunny.service.ClassService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/class")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ClassController {
	ClassService classService;
	
	@PostMapping
	public ResponseApi<ClassDTO> createClass(@RequestBody ClassDTO request) {
		return ResponseApi.<ClassDTO>builder()
				.result(classService.createClass(request))
				.build();
	}
	
	@PutMapping("/{id}")
	public ResponseApi<ClassDTO> updateClass(@PathVariable long id, @RequestBody ClassDTO request) {
		return ResponseApi.<ClassDTO>builder()
				.result(classService.updateClass(id, request))
				.build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseApi<?> deleteClass(@PathVariable long id) {
		classService.deleteClass(id);
		return ResponseApi.builder()
				.result("Class has been deleted")
				.build();
	}
	
	@GetMapping
	public ResponseApi<List<ClassDTO>> getClasses() {
		return ResponseApi.<List<ClassDTO>>builder()
				.result(classService.getClasses())
				.build();
	}
}
