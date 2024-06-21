package com.littlesunny.service;

import com.littlesunny.dto.ClassDTO;
import com.littlesunny.entity.Class;
import com.littlesunny.entity.Student;
import com.littlesunny.entity.StudentClass;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.mapper.ClassMapper;
import com.littlesunny.repository.ClassRepository;
import com.littlesunny.repository.StudentClassRepository;
import com.littlesunny.repository.StudentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class ClassService {
	ClassRepository classRepository;
	StudentRepository studentRepository;
	StudentClassRepository studentClassRepository;
	ClassMapper classMapper;
	
	public ClassDTO createClass(ClassDTO request) {
		if (classRepository.existsByClassName(request.getClassName()))
				throw new AppException(ErrorCode.EXISTED);
		
		Class clazz = classMapper.toClass(request);
		return classMapper.toClassDto(classRepository.save(clazz));
	}
	
	public ClassDTO updateClass(long id, ClassDTO request) {
		Class clazz = classRepository.findById(id).orElseThrow(() ->
				new AppException(ErrorCode.CLASS_NOT_EXISTED));
		
		classMapper.updateClass(clazz, request);
		List<Student> students = studentRepository.findAllByFullName(request.getStudents());
		List<StudentClass> studentClassList = students.stream().map(student ->
			new StudentClass(student, clazz, 0, LocalDate.now(), clazz.getCourse().getCoursePrice(),
					LocalDate.now().minus(1, ChronoUnit.MONTHS), false)
		).toList();
		
		clazz.setStudentClasses(new HashSet<>(studentClassList));
		return classMapper.toClassDto(classRepository.save(clazz));
	}
	
	public void deleteClass(long id) {
		if (!classRepository.existsById(id))
			throw new AppException(ErrorCode.CLASS_NOT_EXISTED);
		
		classRepository.deleteById(id);
	}
	
	public List<ClassDTO> getClasses() {
		return classRepository.findAll().stream().map(classMapper::toClassDto).toList();
	}
}
