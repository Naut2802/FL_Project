package com.littlesunny.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Class {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String className;
	
	@ManyToOne @JoinColumn(name = "courseId")
	Course course;
	@OneToMany(mappedBy = "clazz", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	Set<StudentClass> studentClasses = new HashSet<>();
}
