package com.littlesunny.repository;

import com.littlesunny.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
	boolean existsByCourseName(String courseName);
}
