package com.littlesunny.service;

import com.littlesunny.dto.request.ClassRequest;
import com.littlesunny.dto.response.ClassResponse;
import com.littlesunny.dto.response.StudentClassResponse;
import com.littlesunny.entity.Class;
import com.littlesunny.entity.Student;
import com.littlesunny.entity.StudentClass;
import com.littlesunny.entity.StudentClassId;
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

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class ClassService {
	StudentClassRepository studentClassRepository;
	CourseRepository courseRepository;
	ClassRepository classRepository;
	StudentRepository studentRepository;
	ClassMapper classMapper;
	StudentClassMapper studentClassMapper;
	
	public ClassResponse createClass(ClassRequest request) {
		if (classRepository.existsByClassName(request.getClassName()))
				throw new AppException(ErrorCode.EXISTED);
		
		Class clazz = classMapper.toClass(request);
		
		clazz.setCourse(courseRepository.findById(request.getCourseId()).orElse(null));
		classRepository.save(clazz);
		
		clazz = classRepository.findByClassName(request.getClassName()).orElseThrow(() ->
				new AppException(ErrorCode.CLASS_NOT_EXISTED));
		
		if (request.getStudentIds() != null) {
			List<Student> students = studentRepository.findAllById(request.getStudentIds());
			List<StudentClass> studentClassList = new ArrayList<>();
			String course = "";
			
			for (Student student : students) {
				if (!course.equals(clazz.getCourse().getCourseName())) {
					course = clazz.getCourse().getCourseName();
					if (!studentClassRepository.existsByStudentIdAndCourseId(student.getId(), clazz.getCourse().getId())) {
						StudentClassId studentClassId = new StudentClassId(student.getId(), clazz.getId());
						studentClassList.add(new StudentClass(studentClassId, student, clazz, 0,
								LocalDate.now(), clazz.getCourse().getCoursePrice(),
								LocalDate.now().plusMonths(1), false));
					} else
						throw new AppException(ErrorCode.EXISTED);
				} else
					throw new AppException(ErrorCode.EXISTED);
			}
			
			clazz.setStudentClasses(new HashSet<>(studentClassList));
		}
		
		classRepository.save(clazz);
		
		ClassResponse classResponse = classMapper.toClassResponse(clazz);
		classResponse.setStudents(clazz.getStudentClasses() == null ? null :
				clazz.getStudentClasses()
						.stream()
						.map(studentClassMapper::toStudentClassResponse).toList());
		return classResponse;
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
			String course = "";
			
			for (Student student : students) {
				if (!course.equals(clazz.getCourse().getCourseName())) {
					course = clazz.getCourse().getCourseName();
					if (!studentClassRepository.existsByStudentIdAndCourseId(student.getId(), clazz.getCourse().getId())) {
						StudentClassId studentClassId = new StudentClassId(student.getId(), clazz.getId());
						studentClassList.add(new StudentClass(studentClassId, student, clazz, 0,
								LocalDate.now(), clazz.getCourse().getCoursePrice(),
								LocalDate.now().plusMonths(1), false));
					} else
						throw new AppException(ErrorCode.EXISTED);
				} else
					throw new AppException(ErrorCode.EXISTED);
			}
			
			clazz.setStudentClasses(new HashSet<>(studentClassList));
		}
		
		classRepository.save(clazz);
		
		ClassResponse classResponse = classMapper.toClassResponse(clazz);
		classResponse.setStudents(clazz.getStudentClasses() == null ? null :
				clazz.getStudentClasses()
						.stream()
						.map(studentClassMapper::toStudentClassResponse).toList());
		return classResponse;
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
						.classId(clazz.getId())
						.className(clazz.getClassName())
						.limitQuantity(clazz.getLimitQuantity())
						.courseName(clazz.getCourse().getCourseName())
						.students(clazz.getStudentClasses() == null ? null :
								clazz.getStudentClasses()
										.stream()
										.map(studentClassMapper::toStudentClassResponse).toList())
				.build()));
		
		return classResponses;
	}
	
	public long countStudentsInClass(long classId) {
		return studentClassRepository.countStudentsByClassId(classId);
	}
}
