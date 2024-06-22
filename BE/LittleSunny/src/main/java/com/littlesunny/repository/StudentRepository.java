package com.littlesunny.repository;

import com.littlesunny.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
	Optional<Student> findByFullName(String fullName);
	List<Student> findAllByFullNameIn(Iterable<String> fullNames);
	boolean existsByFullName(String fullName);
}
