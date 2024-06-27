package com.littlesunny.repository;

import com.littlesunny.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
	boolean existsByCourseName(String courseName);
	@Query("SELECT c FROM Course c " +
			"WHERE c.id NOT IN (" +
			"  SELECT co.id FROM Course co " +
			"  JOIN co.classes cl " +
			"  JOIN StudentClass sc ON sc.clazz.id = cl.id " +
			"  WHERE sc.student.id = :studentId" +
			")")
	List<Course> findCoursesNotEnrolledByStudent(@Param("studentId") Long studentId);
}
