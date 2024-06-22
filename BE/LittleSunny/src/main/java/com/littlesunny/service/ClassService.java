package com.littlesunny.service;

import com.littlesunny.dto.request.ClassRequest;
import com.littlesunny.dto.response.ClassResponse;
import com.littlesunny.dto.response.StudentClassResponse;
import com.littlesunny.entity.Class;
import com.littlesunny.entity.Student;
import com.littlesunny.entity.StudentClass;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.mapper.ClassMapper;
import com.littlesunny.mapper.StudentClassMapper;
import com.littlesunny.repository.ClassRepository;
import com.littlesunny.repository.CourseRepository;
import com.littlesunny.repository.StudentClassRepository;
import com.littlesunny.repository.StudentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class ClassService {
	private final CourseRepository courseRepository;
	ClassRepository classRepository;
	StudentRepository studentRepository;
	StudentClassRepository studentClassRepository;
	ClassMapper classMapper;
	StudentClassMapper studentClassMapper;
	
	public ClassResponse createClass(ClassRequest request) {
		if (classRepository.existsByClassName(request.getClassName()))
				throw new AppException(ErrorCode.EXISTED);
		
		Class clazz = classMapper.toClass(request);
		return classMapper.toClassDto(classRepository.save(clazz));
	}
	
	public ClassResponse updateClass(long id, ClassRequest request) {
		Class clazz = classRepository.findById(id).orElseThrow(() ->
				new AppException(ErrorCode.CLASS_NOT_EXISTED));
		
		classMapper.updateClass(clazz, request);
		
		
		clazz.setCourse(courseRepository.findById(request.getCourseId()).orElseThrow(() ->
				new AppException(ErrorCode.COURSE_NOT_EXISTED)));
		
		if (request.getStudentIds() != null) {
			List<Student> students = studentRepository.findAllById(request.getStudentIds());
			List<StudentClass> studentClassList = new ArrayList<>();
			
			students.forEach(student ->
					studentClassList.add(new StudentClass(student, clazz, 0,
							LocalDate.now(), clazz.getCourse().getCoursePrice(),
							LocalDate.now().plusMonths(1), false))
			);
			
			clazz.setStudentClasses(new HashSet<>(studentClassList));
			classRepository.save(clazz);
		}
		
		return ClassResponse.builder()
				.className(clazz.getClassName())
				.courseName(clazz.getCourse().getCourseName())
				.students(clazz.getStudentClasses().stream().map(studentClassMapper::toStudentClassResponse).toList())
				.build();
	}
	
	public void deleteClass(long id) {
		if (!classRepository.existsById(id))
			throw new AppException(ErrorCode.CLASS_NOT_EXISTED);
		
		classRepository.deleteById(id);
	}
	
	public List<ClassResponse> getClasses() {
		List<Class> classes = classRepository.findAll();
		List<ClassResponse> classResponses = new ArrayList<>();
		
		classes.forEach(clazz -> classResponses.add(ClassResponse.builder()
						.className(clazz.getClassName())
						.courseName(clazz.getCourse().getCourseName())
						.students(clazz.getStudentClasses().stream().map(studentClassMapper::toStudentClassResponse).toList())
				.build()));
		
		return classResponses;
	}
}
