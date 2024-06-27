package com.littlesunny.repository;

import com.littlesunny.entity.Class;
import com.littlesunny.entity.Student;
import com.littlesunny.entity.StudentClass;
import com.littlesunny.entity.StudentClassId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudentClassRepository extends JpaRepository<StudentClass, StudentClassId> {
	@Query("SELECT CASE WHEN COUNT(sc) > 0 THEN TRUE ELSE FALSE END " +
		"FROM StudentClass sc " +
		"JOIN sc.clazz c " +
		"JOIN c.course co " +
		"WHERE sc.student.id = :studentId AND co.id = :courseId")
	boolean existsByStudentIdAndCourseId(@Param("studentId") String studentId, @Param("courseId") Long courseId);
}
