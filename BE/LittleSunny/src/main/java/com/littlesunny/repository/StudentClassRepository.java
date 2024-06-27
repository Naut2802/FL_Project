package com.littlesunny.repository;

import com.littlesunny.entity.StudentClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentClassRepository extends JpaRepository<StudentClass, Long> {
	@Query("SELECT CASE WHEN COUNT(sc) > 0 THEN TRUE ELSE FALSE END " +
		"FROM StudentClass sc " +
		"JOIN sc.clazz c " +
		"JOIN c.course co " +
		"WHERE sc.student.id = :studentId AND co.id = :courseId")
	boolean existsByStudentIdAndCourseId(@Param("studentId") Long studentId, @Param("courseId") Long courseId);
}
