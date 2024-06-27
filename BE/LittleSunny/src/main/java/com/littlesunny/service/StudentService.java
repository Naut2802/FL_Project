package com.littlesunny.service;

import com.littlesunny.dto.request.StudentClassRequest;
import com.littlesunny.dto.request.StudentRequest;
import com.littlesunny.dto.response.StudentResponse;
import com.littlesunny.entity.Class;
import com.littlesunny.entity.Student;
import com.littlesunny.entity.StudentClass;
import com.littlesunny.entity.StudentClassId;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.mapper.StudentClassIdMapper;
import com.littlesunny.mapper.StudentClassMapper;
import com.littlesunny.mapper.StudentMapper;
import com.littlesunny.repository.ClassRepository;
import com.littlesunny.repository.StudentClassRepository;
import com.littlesunny.repository.StudentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class StudentService {
	StudentClassRepository studentClassRepository;
	StudentRepository studentRepository;
	ClassRepository classRepository;
	StudentMapper studentMapper;
	StudentClassMapper studentClassMapper;
	StudentClassIdMapper studentClassIdMapper;
	
	public StudentResponse createStudent(StudentRequest request) {
		var student = studentMapper.toStudent(request);
		int idNumber = studentRepository.findMaxIdNumber() == null ? 1 : studentRepository.findMaxIdNumber() + 1;
		
		String id = "HV";
		if (idNumber < 10)
			id += "0" + idNumber;
		else
			id += idNumber;
		
		student.setId(id);
		if (studentRepository.existsById(student.getId()))
			throw new AppException(ErrorCode.EXISTED);
		
		if (request.getClassIds() != null) {
			List<Class> classes = classRepository.findAllById(request.getClassIds());
			List<StudentClass> studentClassList = new ArrayList<>();
			String course = "";
			
			for (Class clazz : classes) {
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
			
			student.setStudentClasses(new HashSet<>(studentClassList));;
		}
		
		studentRepository.save(student);
		
		StudentResponse studentResponse = studentMapper.toStudentResponse(student);
		studentResponse.setClasses(student.getStudentClasses() == null ? null :
				student.getStudentClasses()
						.stream()
						.map(studentClassMapper::toClassStudentResponse).toList());
		return studentResponse;
	}
	
	public StudentResponse updateStudent(String id, StudentRequest request) {
		var student = studentRepository.findById(id).orElseThrow(() ->
				new AppException(ErrorCode.STUDENT_NOT_EXISTED));
		
		studentMapper.updateStudent(student, request);
		
		if (request.getClassIds() != null) {
			List<Class> classes = classRepository.findAllById(request.getClassIds());
			List<StudentClass> studentClassList = new ArrayList<>();
			String course = "";
			
			for (Class clazz : classes) {
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
			
			student.setStudentClasses(new HashSet<>(studentClassList));;
		}
		
		studentRepository.save(student);
		
		StudentResponse studentResponse = studentMapper.toStudentResponse(student);
		studentResponse.setClasses(student.getStudentClasses() == null ? null :
				student.getStudentClasses()
						.stream()
						.map(studentClassMapper::toClassStudentResponse).toList());
		return studentResponse;
	}
	
	public void deleteStudent(String id) {
		if (!studentRepository.existsById(id))
			throw new AppException(ErrorCode.STUDENT_NOT_EXISTED);
		
		studentRepository.deleteById(id);
	}
	
	public List<StudentResponse> getStudents() {
		List<Student> students = studentRepository.findAll();
		List<StudentResponse> studentResponses = new ArrayList<>();
		
		students.forEach(student ->
				studentResponses.add(StudentResponse.builder()
								.id(student.getId())
								.fullName(student.getFullName())
								.address(student.getAddress())
								.phoneNumber(student.getPhoneNumber())
								.dob(student.getDob())
								.parentBankNumber(student.getParentBankNumber())
								.classes(student.getStudentClasses() == null ? null :
										student.getStudentClasses()
												.stream()
												.map(studentClassMapper::toClassStudentResponse).toList())
						.build()));
		
		return studentResponses;
	}
	
	@Transactional(readOnly = true)
	public List<StudentResponse> getStudentsNotEnrolled(long courseId) {
		return studentRepository.findStudentsNotEnrolledInCourse(courseId).stream().map(studentMapper::toStudentResponse).toList();
	}
	
	public StudentResponse updatePaymentStatus(StudentClassRequest request) {
		Student student = studentRepository.findById(request.getStudentId()).orElseThrow(() ->
				new AppException(ErrorCode.STUDENT_NOT_EXISTED));
		
		StudentClassId id = studentClassIdMapper.toStudentClassId(request);
		StudentClass studentClass = studentClassRepository.findById(id).orElseThrow(() ->
				new AppException(ErrorCode.CLASS_NOT_EXISTED));
		
		studentClass.setPaymentStatus(true);
		studentClassRepository.save(studentClass);
		StudentResponse studentResponse = studentMapper.toStudentResponse(student);
		studentResponse.setClasses(List.of(studentClassMapper.toClassStudentResponse(studentClass)));
		return studentResponse;
	}
}
