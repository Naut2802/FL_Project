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
	long id;
	@Column(unique = true)
	String className;
	@Builder.Default
	int limitQuantity = 15;
	
	@ManyToOne @JoinColumn(name = "courseId")
	Course course;
	@OneToMany(mappedBy = "clazz", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	Set<StudentClass> studentClasses = new HashSet<>();
}
