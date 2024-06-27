package com.littlesunny.repository;

import com.littlesunny.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
	Optional<Student> findByFullName(String fullName);
	List<Student> findAllByFullNameIn(Iterable<String> fullNames);
	boolean existsByFullName(String fullName);
	
	@Query("SELECT s FROM Student s " +
			"WHERE s.id NOT IN (" +
			"  SELECT sc.student.id FROM StudentClass sc " +
			"  JOIN sc.clazz c " +
			"  WHERE c.course.id = :courseId" +
			")")
	List<Student> findStudentsNotEnrolledInCourse(@Param("courseId") Long courseId);
}
