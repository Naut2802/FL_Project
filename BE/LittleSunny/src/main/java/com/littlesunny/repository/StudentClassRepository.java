package com.littlesunny.repository;

import com.littlesunny.entity.StudentClass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentClassRepository extends JpaRepository<StudentClass, Long> {
}
