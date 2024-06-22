package com.littlesunny.service;

import com.littlesunny.dto.StudentDTO;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.mapper.StudentMapper;
import com.littlesunny.repository.StudentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class StudentService {
	StudentRepository studentRepository;
	StudentMapper studentMapper;
	
	public StudentDTO createStudent(StudentDTO request) {
		if (studentRepository.existsByFullName(request.getFullName()))
			throw new AppException(ErrorCode.EXISTED);
		
		var student = studentMapper.toStudent(request);
		
		return studentMapper.toStudentDto(studentRepository.save(student));
	}
	
	public StudentDTO updateStudent(long id, StudentDTO request) {
		var student = studentRepository.findByFullName(request.getFullName()).orElseThrow(() ->
				new AppException(ErrorCode.STUDENT_NOT_EXISTED));
		
		studentMapper.updateStudent(student, request);
		return studentMapper.toStudentDto(studentRepository.save(student));
	}
	
	public void deleteStudent(long id) {
		if (!studentRepository.existsById(id))
			throw new AppException(ErrorCode.STUDENT_NOT_EXISTED);
		
		studentRepository.deleteById(id);
	}
	
	public List<StudentDTO> getStudents() {
		return studentRepository.findAll().stream().map(studentMapper::toStudentDto).toList();
	}
}
