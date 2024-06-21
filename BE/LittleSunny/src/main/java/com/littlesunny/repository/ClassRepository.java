package com.littlesunny.repository;

import com.littlesunny.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClassRepository extends JpaRepository<Class, Long> {
	boolean existsByClassName(String className);
	Optional<Class> findByClassName(String className);
	List<Class> findAllByClassName(Iterable<String> classNames);
}
